const hw = (app) => {
  const { router, controller, io, jwt } = app;
  router.get('/getAuthToken', controller.login.getAuthToken);
  // cph
  router.get('/getProjects', controller.cph.getProjects);
  router.get('/getCphServers', controller.cph.getCphServers);
  router.get('/getCphPhones', controller.cph.getCphPhones);
  router.get('/batchResetPhone', controller.cph.batchResetPhone);
  router.get('/getHandleCphPhones', controller.cph.getHandleCphPhones);
  
  // files
  router.get('/filesSearchShare', controller.adb.filesSearchShare);

  // adb
  router.get('/test', controller.adb.test);
  router.get('/phoneCommandsInstallApks', controller.adb.phoneCommandsInstallApks);
  router.get('/phoneCommandsPushApk', controller.adb.phoneCommandsPushApk);
  router.get('/phoneCommandsInstallApkForAirtest', controller.adb.phoneCommandsInstallApkForAirtest);
  router.get('/phoneCommandsRunApkForAirtest', controller.adb.phoneCommandsRunApkForAirtest);

  // sh
  router.get('/adbConnectSh', controller.sh.adbConnectSh);
  
}
module.exports = hw
