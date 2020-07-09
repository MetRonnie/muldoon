const env = process.env;

const body = `
 :test_tube: **Experiment: nothing below is actually true**

**The \`${env.WORKFLOW}\` workflow has identified this as a release preparation PR**

(This is because the name of the PR branch, \`${env.HEAD_REF}\`, starts with \`prepare-\`, and the \`foo.md\` file has been modified)

**Checklist:**
- ${env.ASDF.includes("3.0.1") ? "✔️ Version number is correct" : "⚠️ Version number appears incorrect"}
- ${env.ASDF.includes("MEOW MEOW") ? "✔️ Something is okay" : "⚠️ Something is not okay"}
`;


console.log(JSON.stringify({"body": body}))
