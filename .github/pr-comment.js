const env = process.env

const body = `
 :test_tube: **Experiment: nothing below is actually true**

**The \`${env.WORKFLOW}\` workflow has identified this as a release preparation PR**

(This is because the name of the PR branch, \`${env.HEAD_REF}\`, starts with \`prepare-\`, and the \`foo.md\` file has been modified)

**Checklist:**
- [ ] Foo
`;

console.log(JSON.stringify({"body": body}))
