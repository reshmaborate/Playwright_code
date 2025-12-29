
const config= ({
  testDir: './tests',
    // testDir: './tests/UiControls.spec.js',

  
  //Timeout for each test
  timeout: 30*1000,
  //expect Timeout for each assertion
  expect: {
    timeout: 4000,
  },
  reporter :'html',

  use: {
      browserName : 'chromium',
      headless : false,
      screenshot:'on',
      // trace:'on',
      trace:'retain-on-failure' //off,on  
  },
});

module.exports =config