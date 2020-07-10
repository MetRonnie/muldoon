const env = process.env;

const body = [`
:test_tube: **Experiment: nothing below is actually true**

**The \`${env.WORKFLOW}\` workflow has identified this as a release preparation PR**

(This is because the name of the PR branch, \`${env.HEAD_REF}\` starts with \`prepare-\`, and the \`__init__.py\` file has been modified)
`];

const checklist = () => `
**Checklist:**
- ${env.ASDF.includes("3.0.1") ? "✔️ Thingy number" : "⚠️ Thingy number appears incorrect"}
- ${parseInt(env.MILESTONE_OPEN_ISSUES) > 0 ? "⚠️" : "✔️"} ${env.MILESTONE_OPEN_ISSUES} open issue(s) on [milestone ${env.MILESTONE_TITLE}](https://github.com/${env.REPOSITORY}/milestone/${env.MILESTONE_NUMBER})
`;

const onJobFail = () => `
❌ **Something went wrong - check the workflow run**
`;

if (env.JOB_STATUS !== "success") {
    body.push(onJobFail());
} else {
    body.push(checklist());
}

console.log(JSON.stringify({"body": body.join("")}));
