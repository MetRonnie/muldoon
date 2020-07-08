const args = process.argv.slice(2);

const workflow = args[0];
const head_ref = args[1];

const body = `
 :test_tube: **Experiment: nothing below is actually true**

**The \`${workflow}\` workflow has identified this as a release preparation PR**

(This is because the name of the PR branch, \`${head_ref}\`, starts with \`prepare-\`, and the \`foo.md\` file has been modified)

**Checklist:**
- [ ] Foo
`;

console.log(JSON.stringify({"body": body}))
