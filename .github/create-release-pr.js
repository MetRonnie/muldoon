const {exec} = require('child_process');
const env = process.env;
const curlOpts = '--silent --fail'

const milestone = getMilestone();

const milestoneText = () => {
    let checkbox = "[ ]";
    let note = `⚠️ Could not find milestone matching "${env.VERSION}"`;
    if (milestone) {
        if (parseInt(milestone.open_issues) === 0) {
            checkbox = "[x]";
        }
        note = `${milestone.open_issues} other open issues/PRs on [milestone ${milestone.title}](https://github.com/${env.REPOSITORY}/milestone/${milestone.number})`;
    }
    return `${checkbox} Milestone complete? ${note}`;
};

const bodyText = `
**This PR was created by the \`${env.WORKFLOW}\` workflow, triggered by @${env.AUTHOR}**

#### Tests:
✔️ \`setup.py\` bdist test

#### Checklist:
- ${milestoneText()}
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
    // Don't use env.GH_TOKEN above as that might print in log.

exec(request, (err, stdout, stderr) => {
    handleExecResult(request, err, stdout, stderr);
    const pr = JSON.parse(stdout);
    setMilestoneAndAssignee(pr.number);
});


function setMilestoneAndAssignee(prNumber) {
    // Cannot set them when creating the PR unfortunately
    const payload = JSON.stringify({
        milestone: milestone ? milestone.number : undefined,
        assignees: [env.AUTHOR]
    });

    const request = `curl -X PATCH \
        https://api.github.com/repos/${env.REPOSITORY}/issues/${prNumber} \
        -H "authorization: Bearer $GH_TOKEN" \
        -H "content-type: application/json" \
        --data '${payload}' \
        ${curlOpts}`;

    exec(request, (err, stdout, stderr) => {
        handleExecResult(request, err, stdout, stderr);
    });
}

function getMilestone() {
    const request = `curl -X GET \
        https://api.github.com/repos/${env.REPOSITORY}/milestones \
        -H "authorization: Bearer $GH_TOKEN" \
        ${curlOpts}`;

    let milestone = undefined;
    exec(request, (err, stdout, stderr) => {
        try {
            handleExecResult(request, err, stdout, stderr);
        } catch (err) {
            console.log(`::warning :: Error finding milestone`);
            console.log(err, '\n');
            return;
        }
        const response = JSON.parse(stdout);
        for (milestone of response) {
            if (milestone.title.includes(env.VERSION)) {
                console.log('Found milestone:', milestone.title, '\n');
                return;
            }
        }
        console.log(`::warning :: Could not find milestone matching "${env.VERSION}"`);
        milestone = undefined;
    });
    return milestone;
}

function handleExecResult(cmd, err, stdout, stderr) {
    if (err) throw err;
    console.log('=====================  cmd  ======================');
    console.log(cmd);
    if (stderr) {
        console.log('===================== stderr =====================');
        console.log(stderr);
    };
    console.log('===================== stdout =====================');
    console.log(stdout, '\n');
}
