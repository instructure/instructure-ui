pipeline {
    agent any
    options { ansiColor('xterm') }

    parameters {
        string(name: 'PROJECT_REPO', defaultValue: 'https://github.com/instructure/instructure-ui', description: 'The target project repository URL')
        string(name: 'TARGET_BRANCH', defaultValue: 'master', description: 'The name of the branch which is the target of the pull requests')
        string(name: 'DOC_FOLDER', defaultValue: 'openapi', description: 'The documentation folder path')
        string(name: 'URL_SEGMENT', defaultValue: 'instui', description: 'The URL segment for the target project, under which your documentation will be available')
        string(name: 'SLACK_CHANNEL', defaultValue: 'instui-bud', description: 'The Slack channel for notifications')
    }

    stages {
        stage('Display Parameters and Environment Variables') {
            steps {
                script {
                    echo 'Environment Variables:'
                    sh 'env | sort'

                    echo 'Build Parameters:'
                    params.each { param -> echo "${param.key} = ${param.value}" }
                }
            }
        }
        stage ('Detect Build Cause') {
            steps {
                script {
                    if (env.TAG_NAME) {
                        // A new tag was created
                        def tagPattern = ~/^v[0-9]+\.[0-9]+\.[0-9]+$/
                        if (env.TAG_NAME ==~ tagPattern) {
                            env.TARGET_ENV = 'prod'
                            echo "Build was triggered by a Tag: ${env.TAG_NAME}. ==> Deploying to ${env.TARGET_ENV}"
                        } else {
                            echo "Build was triggered by a Tag: ${env.TAG_NAME}. But the tag does not match the pattern ${tagPattern}. No action required."
                            env.TARGET_ENV = ''
                        }
                    }
                    else if (env.BRANCH_NAME == params.TARGET_BRANCH) {
                        // Push to master branch - deploy to both test and beta
                        env.TARGET_ENVS = 'test,beta'
                        echo "Build was triggered by a Push to '${params.TARGET_BRANCH}' branch. ==> Deploying to test and beta"
                    }
                    else {
                        echo "Build was triggered by a not monitored Github event or unsupported branch. No action required."
                        currentBuild.description = 'Skip unsupported Github event or branch'
                        currentBuild.result = 'SUCCESS'
                        return
                    }
                }
            }
        }
        stage ('Build Documentation') {
            when {
                expression {
                    return (env.TARGET_ENV && env.TARGET_ENV != '') || (env.TARGET_ENVS && env.TARGET_ENVS != '')
                }
            }
            steps {
                script {
                    // Determine which environments to deploy to
                    def environments = []
                    if (env.TARGET_ENV) {
                        environments.add(env.TARGET_ENV)
                    } else if (env.TARGET_ENVS) {
                        environments = env.TARGET_ENVS.split(',')
                    }

                    // Check if the change contains documentation files (skip for tags - we deploy all tagged releases) 
                    def shouldCheckDocFiles = environments.any { it == 'test' || it == 'beta' }
                    if (shouldCheckDocFiles) {
                        def containsDocFiles = isChangeRelevant(params.PROJECT_REPO, env.GIT_COMMIT, params.DOC_FOLDER)
                        if (!containsDocFiles) {
                            echo 'No documentation files found in the change'
                            currentBuild.description = 'No doc files in the change'
                            currentBuild.result = 'SUCCESS'
                            return
                        }
                    }

                    // Deploy to each environment
                    for (targetEnv in environments) {
                        echo "Building documentation for ${params.PROJECT_REPO} with refspec: ${env.GIT_COMMIT} ==> Deploying to ${targetEnv}"
                        build(job: 'Restructure/Documentation Portal/Workers/DocSync',
                            parameters: [
                                string(name: 'TARGET_ENV', value: targetEnv),
                                string(name: 'SOURCE_KIND', value: "git"),
                                string(name: 'SOURCE_PROJECT', value: "${params.PROJECT_REPO}"),
                                string(name: 'SOURCE_PROJECT_REFSPEC', value: env.GIT_COMMIT),
                                string(name: 'SOURCE_PROJECT_DOC_FOLDER', value: "${params.DOC_FOLDER}"),
                                string(name: 'URL_SEGMENT', value: "${params.URL_SEGMENT}"),
                                string(name: 'SLACK_CHANNEL', value: "${params.SLACK_CHANNEL}")
                            ],
                            wait: true,
                            propagate: true
                        )
                    }
                }
            }
        }
    }
}

/**
 * Check if the change contains files in a specific folder
 * @param docFolder The name of the folder to check
 * @return true if the change contains files in the specified folder, false otherwise
 */
def isChangeRelevant(String projectUrl, String refSpec, String docFolder) {
    if (docFolder == null || docFolder.isEmpty()) {
        echo 'No documentation folder specified. Skipping the check.'
        return false
    } else if (docFolder == '.') {
        echo 'Documentation folder is set to the root of the repository. Any change is considered relevant.'
        return true
    }

    def result = false
    def tempDir = "${UUID.randomUUID().toString()}"
    sh "mkdir -p ${tempDir}"

    echo "Cloning ${projectUrl} with refspec: ${refSpec}. Checking for changes in ${docFolder} folder"
    withCredentials([gitUsernamePassword(credentialsId: 'instructure-jenkins-instructure-org', gitToolName: 'git-tool')]) {
        sh "git clone ${projectUrl} ${tempDir} && cd ${tempDir} && git checkout ${refSpec}"
    }

    dir(tempDir) {
        def changedFiles = sh(script: "git diff --name-only HEAD~1 HEAD", returnStdout: true).trim()
        printf("Changed files:\n%s", changedFiles)
        changedFiles = changedFiles.split("\n")
        result = changedFiles.any { it.startsWith "${params.DOC_FOLDER}/" }
    }

    sh "rm -rf ${tempDir}"
    return result
}