import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { initRepo } from './controllers/init.js';
import { addRepo } from './controllers/add.js';
import { commitRepo } from './controllers/commit.js';
import { pushRepo } from './controllers/push.js';
import { pullRepo } from './controllers/pull.js';
import { revertRepo } from './controllers/revert.js';

yargs(hideBin(process.argv))
  .scriptName('index.js')
  .command('init', 'Initialise a new repository', {}, initRepo)

  .command(
    'add <file>',
    'Add a file to the repository',
    (yargs) => {
      yargs.positional('file', {
        describe: 'The file to add',
        type: 'string',
      });
    },
    addRepo
  )

  .command(
    'commit',
    'Commit changes to the repository',
    (yargs) =>
      yargs.option('message', {
        alias: 'm',
        describe: 'Commit message',
        type: 'string',
        demandOption: true,
      }),
    commitRepo
  )

  .command('push', 'Push committed changes', {}, pushRepo)

  .command('pull', 'Pull latest changes', {}, pullRepo)

  .command('revert <commitID>', 'Revert to the previous commit', (yargs) => {
    yargs.positional('commitID', {
      describe: 'The commit to revert to',
      type: 'string',
    });
  }, revertRepo)

  .demandCommand(1, 'You need to specify a command')
  .strict()
  .help()
  .argv;
