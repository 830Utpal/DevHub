import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { initRepo } from './controllers/init.js';
import { addRepo} from './controllers/add.js';

yargs(hideBin(process.argv))
  .command(
    'init',
    'Initialise a new repository',
    {},
    initRepo
  )
  .command('add <file>', 'Add a file to the repository', (yargs) => {
    yargs.positional('file', {
      describe: 'The file to add',
      type: 'string'
    });
  },
    addRepo
)
  .demandCommand(1, 'You need to specify a command')
  .help()
  .argv;
