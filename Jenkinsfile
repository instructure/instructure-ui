pipeline {
  agent { label 'docker' }

  environment {
    CHROMATIC_APP_CODE="${CHROMATIC_APP_CODE}"
    GIT_EMAIL="${GIT_EMAIL}"
    GIT_USERNAME="${GIT_USERNAME}"
    GIT_REMOTE_URL="${GIT_REMOTE_URL}"
    GIT_REMOTE_NAME="${GIT_REMOTE_NAME}"
    UV_THREADPOOL_SIZE=128
  }

  stages {
    stage('Test') {
      when { environment name: "GERRIT_EVENT_TYPE", value: "patchset-created" }

      steps {
        sh './docker/test'
      }
    }

    stage('VRT') {
      when { environment name: "GERRIT_EVENT_TYPE", value: "comment-added" }

      steps {
        sh './docker/vrt'
      }
    }
  }
}
