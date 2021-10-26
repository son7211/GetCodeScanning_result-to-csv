# GetCodeScanning

This is simple GitHub Action which gets GitHub Advanced Security - Code Scanning results to JSON. 

- Require `GITHUB_TOKEN` which is automatically generated
- `GITHUB_TOKEN` should have `read` permission for `security`

Usage:
  
  uses : son7211/GetCodeScanning@main
  #with :
  //  repo_owner: $ {{ github.repository_owner }}
  //  repository_name: $ {{ github.repository }}

