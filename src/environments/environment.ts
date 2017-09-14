// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  baseUrl: 'http://127.0.0.1:10002/iothub2dbfunctia910/rfidData',
  sas: {
    st: '2017-09-13T11:33:00Z',
    se: '2017-09-14T11:33:00Z',
    sp: 'r',
    sv: '2016-05-31',
    tn: 'rfiddata',
    sig: 'zXPttgkyvHNxaNwQjXOqsU5t0MagFGKTVRWfT3Jp3dQ='
  }
};
