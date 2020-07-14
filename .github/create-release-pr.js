const {exec} = require('child_process');
const env = process.env;

// const getMilestone = () => {
//     const request = `curl https://api.github.com/repos/${env.REPOSITORY}/milestones \
//         -H "authorization: Bearer $GH_TOKEN" \
//         --silent --fail`;
//         // Don't use env.GH_TOKEN above as that might print in log.
//     exec(request, (err, stdout, stderr) => {
//         if (err) throw err;
//         if (stderr) throw stderr;
//         const response_arr = JSON.parse(stdout);
//         for (const milestone of response_arr) {
//             if (milestone.title.includes(env.VERSION)) {
//                 console.log(`Title: ${milestone.title}, open issues: ${milestone.open_issues}`);
//                 return milestone;
//             }
//         }
//         console.log(`::warning :: Could not find milestone matching "${env.VERSION}"`);
//         console.log(response_arr);
//     });
// };

// const milestoneText = () => {
//     const milestone = getMilestone();
//     let checkbox = "[ ]";
//     let note = `⚠️ Could not find milestone matching ${env.VERSION}`;
//     if (milestone) {
//         if (parseInt(milestone.open_issues) === 0) {
//             checkbox = "[x]";
//         }
//         note = `${milestone.open_issues} open issues/PRs on [milestone ${milestone.title}](https://github.com/${env.REPOSITORY}/milestone/${milestone.number})`;
//     }
//     return `${checkbox} Milestone complete? ${note}`;
// };

const bodyText = `
**This PR was automatically created by the \`${env.WORKFLOW}\` workflow**

#### Tests:
✔️ \`setup.py\` bdist test

#### Checklist:
- [ ] Changelog up-to-date?
- [ ] Contributors up-to-date in README?
- [ ] \`.mailmap\` file up-to-date?
`;

const payload = JSON.stringify({
    title: `Prepare release: ${env.VERSION}`,
    head: env.BRANCH_NAME,
    base: env.DEFAULT_BRANCH,
    body: bodyText
});

const request = `curl -X POST \
    https://api.github.com/repos/${env.REPOSITORY}/pulls \
    -H "authorization: Bearer $GH_TOKEN" \
    -H "content-type: application/json" \
    --data '${payload}' \
    --fail`;

exec(request, (err, stdout, stderr) => {
    handleExec(request, err, stdout, stderr);
    response = JSON.parse(stdout);
    setMilestoneAndAssignee(response.number);
});


function setMilestoneAndAssignee(prNumber) {
    // Cannot set them when creating the PR unfortunately
    const payload = JSON.stringify({
        milestone: 1,
        assignees: ['MetRonnie']
    });

    const request = `curl -X PATCH \
        https://api.github.com/repos/${env.REPOSITORY}/issues/${prNumber} \
        -H "authorization: Bearer $GH_TOKEN" \
        -H "content-type: application/json" \
        --data '${payload}' \
        --fail`;

    exec(request, (err, stdout, stderr) => {
        handleExec(request, err, stdout, stderr);
    });
}

function handleExec(cmd, err, stdout, stderr) {
    if (err) throw err;
    console.log('=====================  cmd  ======================');
    console.log(cmd);
    if (stderr) {
        console.log('===================== stderr =====================');
        console.log(stderr);
    };
    console.log('===================== stdout =====================');
    console.log(stdout);
    console.log(' ');
}
