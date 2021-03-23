const Service = require('egg').Service;
const process = require('child_process');
class buildService extends Service {
  async build(tar_name) {
    const shellStr = `
      rm -rf ./${tar_name}.tar
      tar -cpvf ./airtest/${tar_name}.tar ./airtest/${tar_name}
    `
    return new Promise((resolve, reject) => {
      process.exec(shellStr,function (error, stdout, stderr) {
        if (error !== null) {
          console.log('exec error: ' + error);
        }
        console.log(stdout)
        resolve(true)
      });
    })
    
  }
}

module.exports = buildService;