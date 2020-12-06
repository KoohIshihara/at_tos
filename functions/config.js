// よくアクセスするページたち
// - 起源元のFunctionsをallUsersに許可
//     - https://console.cloud.google.com/functions/list
// - Cloud Build API
//     - https://console.developers.google.com/apis/api/cloudbuild.googleapis.com/overview?project=setteicho-dev

// デプロイで忘れがちなもの
// - ProdのプロジェクトもAuth Method許可したか？
// - cloud functionsのconfigもprodにしたか？
// - mixpanelのenv切り替えたか？

// service keyの作成
// https://console.cloud.google.com/iam-admin/serviceaccounts?project=setteicho-dev&folder=&organizationId=&supportedpurview=project

const env = "dev"
let config, domain, serviceAccount

if (env === "dev") {
  // serviceAccount = require('./key-dev.json')
  config = {
    // credential: admin.credential.cert(serviceAccount),
    apiKey: "AIzaSyCbzQbG634jk3Z8MWoTQCUqCrLX7vlCv6A",
    authDomain: "fir-tmp-project.firebaseapp.com",
    databaseURL: "https://fir-tmp-project.firebaseio.com",
    projectId: "fir-tmp-project",
    storageBucket: "fir-tmp-project.appspot.com",
    messagingSenderId: "230309505883"
  }
  domain = "https://fir-tmp-project.firebaseapp.com/"
} else if (env === "stage") {
  // serviceAccount = require('./key-stage.json')
  config = {
    // credential: admin.credential.cert(serviceAccount),
    apiKey: "AIzaSyCbzQbG634jk3Z8MWoTQCUqCrLX7vlCv6A",
    authDomain: "fir-tmp-project.firebaseapp.com",
    databaseURL: "https://fir-tmp-project.firebaseio.com",
    projectId: "fir-tmp-project",
    storageBucket: "fir-tmp-project.appspot.com",
    messagingSenderId: "230309505883"
  }
  domain = "https://fir-tmp-project.firebaseapp.com/"
} else if (env === "prod") {
  // serviceAccount = require('./key-prod.json')
  config = {
    // credential: admin.credential.cert(serviceAccount),
    apiKey: "AIzaSyCbzQbG634jk3Z8MWoTQCUqCrLX7vlCv6A",
    authDomain: "fir-tmp-project.firebaseapp.com",
    databaseURL: "https://fir-tmp-project.firebaseio.com",
    projectId: "fir-tmp-project",
    storageBucket: "fir-tmp-project.appspot.com",
    messagingSenderId: "230309505883"
  }
  domain = "https://fir-tmp-project.firebaseapp.com/"
}

module.exports = { config, domain }
// export { config, domain }