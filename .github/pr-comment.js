const env = process.env;
const echo = console.log;

const returnPayload = (body) => JSON.stringify({"body": body});

const versionText = () => {
    let checkbox = "[x]";
    let note = "";
    if (! env.HEAD_REF.includes(env.INIT_VERSION)) {
        checkbox = "[ ]";
        note = "(⚠️ does not match version number in PR branch name)";
    }
    return `${checkbox} Version number: \`${env.INIT_VERSION}\` ${note}`
};

const milestoneText = () =>  {
    let checkbox = "[ ]";
    let note = `⚠️ Could not find milestone matching ${env.INIT_VERSION}`;
    if (env.MILESTONE_JSON) {
        const milestone = JSON.parse(env.MILESTONE_JSON);
        if (parseInt(milestone.open_issues) === 0) {
            checkbox = "[x]";
        }
        note = `${milestone.open_issues} open issues/PRs on [milestone ${milestone.title}](https://github.com/${env.REPOSITORY}/milestone/${milestone.number})`;
    }
    return `${checkbox} Milestone complete? ${note}`;
};

const checklistText = () => `
**Checklist:**
- ${versionText()}
- ${milestoneText()}
- [ ] Changelog up-to-date?
- [ ] Contributors up-to-date in README?
- [ ] \`.mailmap\` file up-to-date?

setup.py bdist test: ✔️ succeeded
`;

const jobFailText = () => `
❌ **Something went wrong - check the workflow run**
`;

const fullText = () => `
:test_tube: **Experiment: nothing below is actually true**

**The \`${env.WORKFLOW}\` workflow has identified this as a release preparation PR**

(This is because the name of the PR branch, \`${env.HEAD_REF}\` starts with \`prepare-\`, and the \`__init__.py\` file has been modified)

${env.JOB_STATUS === "success" ? checklistText() : jobFailText()}
`;

let payload;
try {
    payload = returnPayload(fullText());
} catch (err) {
    payload = returnPayload(jobFailText());
    console.error(err);
}

echo(payload);
