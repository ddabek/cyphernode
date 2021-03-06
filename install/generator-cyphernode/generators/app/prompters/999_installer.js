const path = require('path');
const chalk = require('chalk');

const name = 'installer';

const capitalise = function( txt ) {
  return txt.charAt(0).toUpperCase() + txt.substr(1);
};

const prefix = function() {
  return chalk.green(capitalise(name)+': ');
};

const installerDocker = function(props) {
  return props.installer_mode === 'docker'
};

module.exports = {
  name: function() {
    return name;
  },
  prompts: function( utils ) {
    return [{
      type: 'list',
      name: 'installer_mode',
      default: utils._getDefault( 'installer_mode' ),
      message: prefix()+chalk.red('Where do you want to install cyphernode?')+utils._getHelp('installer_mode'),
      choices: [{
        name: "Docker",
        value: "docker"
      }]
    },
    {
      when: installerDocker,
      type: 'list',
      name: 'gatekeeper_datapath',
      default: utils._getDefault( 'gatekeeper_datapath' ),
      choices: [
        {
          name: "/var/run/cyphernode/gatekeeper (needs sudo and "+chalk.red('incompatible with OSX')+")",
          value: "/var/run/cyphernode/gatekeeper"
        },
        {
          name: "~/.cyphernode/gatekeeper",
          value: "~/.cyphernode/gatekeeper"
        },
        {
          name: "~/gatekeeper",
          value: "~/gatekeeper"
        },
        {
          name: "Custom path",
          value: "_custom"
        }
        ],
      message: prefix()+'Where do you want to store your gatekeeper data?'+utils._getHelp('gatekeeper_datapath'),
    },
    {
      when: (props)=>{ return installerDocker(props) && (props.gatekeeper_datapath === '_custom') },
      type: 'input',
      name: 'gatekeeper_datapath_custom',
      default: utils._getDefault( 'gatekeeper_datapath_custom' ),
      filter: utils._trimFilter,
      validate: utils._pathValidator,
      message: prefix()+'Custom path for gatekeeper data?'+utils._getHelp('gatekeeper_datapath_custom'),
    },
    {
      when: installerDocker,
      type: 'list',
      name: 'proxy_datapath',
      default: utils._getDefault( 'proxy_datapath' ),
      choices: [
        {
          name: "/var/run/cyphernode/proxy (needs sudo and "+chalk.red('incompatible with OSX')+")",
          value: "/var/run/cyphernode/proxy"
        },
        {
          name: "~/.cyphernode/proxy",
          value: "~/.cyphernode/proxy"
        },
        {
          name: "~/proxy",
          value: "~/proxy"
        },
        {
          name: "Custom path",
          value: "_custom"
        }
      ],
      message: prefix()+'Where do you want to store your proxy data?'+utils._getHelp('proxy_datapath'),
    },
    {
      when: (props)=>{ return installerDocker(props) && (props.proxy_datapath === '_custom') },
      type: 'input',
      name: 'proxy_datapath_custom',
      default: utils._getDefault( 'proxy_datapath_custom' ),
      filter: utils._trimFilter,
      validate: utils._pathValidator,
      message: prefix()+'Custom path for your proxy data?'+utils._getHelp('proxy_datapath_custom'),
    },
    {
      when: function(props) { return installerDocker(props) && props.bitcoin_mode === 'internal' },
      type: 'list',
      name: 'bitcoin_datapath',
      default: utils._getDefault( 'bitcoin_datapath' ),
      choices: [
        {
          name: "/var/run/cyphernode/bitcoin (needs sudo and "+chalk.red('incompatible with OSX')+")",
          value: "/var/run/cyphernode/bitcoin"
        },
        {
          name: "~/.cyphernode/bitcoin",
          value: "~/.cyphernode/bitcoin"
        },
        {
          name: "~/bitcoin",
          value: "~/bitcoin"
        },
        {
          name: "Custom path",
          value: "_custom"
        }
      ],
      message: prefix()+'Where do you want to store your bitcoin full node data?'+utils._getHelp('bitcoin_datapath'),
    },
    {
      when: function(props) { return installerDocker(props) && props.bitcoin_mode === 'internal' && props.bitcoin_datapath === '_custom' },
      type: 'input',
      name: 'bitcoin_datapath_custom',
      default: utils._getDefault( 'bitcoin_datapath_custom' ),
      filter: utils._trimFilter,
      validate: utils._pathValidator,
      message: prefix()+'Custom path for your bitcoin full node data?'+utils._getHelp('bitcoin_datapath_custom'),
    },
    {
      when: function(props) { return installerDocker(props) && props.features.indexOf('lightning') !== -1 },
      type: 'list',
      name: 'lightning_datapath',
      default: utils._getDefault( 'lightning_datapath' ),
      choices: [
        {
          name: "/var/run/cyphernode/lightning (needs sudo - "+chalk.red('incompatible with OSX')+")",
          value: "/var/run/cyphernode/lightning"
        },
        {
          name: "~/.cyphernode/lightning",
          value: "~/.cyphernode/lightning"
        },
        {
          name: "~/lightning",
          value: "~/lightning"
        },
        {
          name: "Custom path",
          value: "_custom"
        }
      ],
      message: prefix()+'Where do you want to store your lightning node data?'+utils._getHelp('lightning_datapath'),
    },
    {
      when: function(props) { return installerDocker(props) && props.features.indexOf('lightning') !== -1 && props.lightning_datapath === '_custom'},
      type: 'input',
      name: 'lightning_datapath_custom',
      default: utils._getDefault( 'lightning_datapath_custom' ),
      filter: utils._trimFilter,
      validate: utils._pathValidator,
      message: prefix()+'Custom path for your lightning node data?'+utils._getHelp('lightning_datapath_custom'),
    },
    {
      when: function(props) { return installerDocker(props) && props.features.indexOf('otsclient') !== -1 },
      type: 'list',
      name: 'otsclient_datapath',
      default: utils._getDefault( 'otsclient_datapath' ),
      choices: [
        {
          name: "/var/run/cyphernode/otsclient (needs sudo and "+chalk.red('incompatible with OSX')+")",
          value: "/var/run/cyphernode/otsclient"
        },
        {
          name: "~/.cyphernode/otsclient",
          value: "~/.cyphernode/otsclient"
        },
        {
          name: "~/otsclient",
          value: "~/otsclient"
        },
        {
          name: "Custom path",
          value: "_custom"
        }
      ],
      message: prefix()+'Where do you want to store your OTS data?'+utils._getHelp('otsclient_datapath'),
    },
    {
      when: function(props) { return installerDocker(props) && props.features.indexOf('otsclient') !== -1 && props.otsclient_datapath === '_custom' },
      type: 'input',
      name: 'otsclient_datapath_custom',
      default: utils._getDefault( 'otsclient_datapath_custom' ),
      filter: utils._trimFilter,
      validate: utils._pathValidator,
      message: prefix()+'Where is your otsclient data?'+utils._getHelp('otsclient_datapath_custom'),
    },
    {
      when: function(props) { return installerDocker(props) && props.bitcoin_mode === 'internal' },
      type: 'confirm',
      name: 'bitcoin_expose',
      default: utils._getDefault( 'bitcoin_expose' ),
      message: prefix()+'Expose bitcoin full node outside of the docker network?'+utils._getHelp('bitcoin_expose'),
    },
    {
      when: function(props) { return installerDocker(props) && props.features.indexOf('lightning') !== -1  },
      type: 'confirm',
      name: 'lightning_expose',
      default: utils._getDefault( 'lightning_expose' ),
      message: prefix()+'Expose lightning node outside of the docker network?'+utils._getHelp('lightning_expose'),
    },
    {
      when: installerDocker,
      type: 'list',
      name: 'docker_mode',
      default: utils._getDefault( 'docker_mode' ),
      message: prefix()+'What docker mode: docker swarm or docker-compose?'+utils._getHelp('docker_mode'),
      choices: [{
        name: "docker swarm",
        value: "swarm"
      },
      {
        name: "docker-compose",
        value: "compose"
      }]
    },
    {
      type: 'confirm',
      name: 'installer_cleanup',
      default: utils._getDefault( 'installer_cleanup' ),
      message: prefix()+'Cleanup installer after installation?'+utils._getHelp('installer_cleanup'),
    }];
  },
  templates: function( props ) {
    if( props.installer_mode === 'docker' ) {
      return ['config.sh','start.sh', 'stop.sh', 'testfeatures.sh', path.join('docker', 'docker-compose.yaml')];
    }
    return ['config.sh','start.sh', 'stop.sh', 'testfeatures.sh'];
  }
};
