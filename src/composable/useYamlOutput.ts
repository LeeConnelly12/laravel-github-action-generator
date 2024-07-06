import { computed, ref } from 'vue'
import { stringify } from 'yaml'
import { set } from 'lodash-es'
import { Form } from '@/types/Form'

export function useYamlOutput() {
  const form = ref<Form>({
    name: 'my workflow',
    triggers: [
      {
        enabled: false,
        type: 'on_push',
        label: 'on push',
      },
      {
        enabled: false,
        type: 'on_pull_request',
        label: 'on pull request',
      },
    ],
    database: 'mysql',
    database_version: '8.0',
    php_version: '8.3',
    node_version: '20',
    test: 'phpunit',
    static_analysis: null,
  })

  const getName = (name: Form['name']) => {
    return {
      name: name + '%',
    }
  }

  const getTriggers = (triggers: Form['triggers']) => {
    const output = {}

    const enabledBothTriggers =
      triggers.filter((trigger) => trigger.enabled).length === 2

    triggers
      .filter((trigger) => trigger.enabled)
      .forEach((trigger) => {
        if (trigger.label === 'on push') {
          set(output, 'on.push.branches', [
            !enabledBothTriggers ? 'main%' : 'main',
          ])
        }

        if (trigger.label === 'on pull request') {
          set(output, 'on.pull_request.branches', [
            enabledBothTriggers ? 'main%' : 'main',
          ])
        }
      })

    return output
  }

  const getDatabase = (databaseVersion: string) => {
    return {
      services: {
        mysql: {
          image: `mysql:${databaseVersion}`,
          env: {
            MYSQL_ALLOW_EMPTY_PASSWORD: 'yes',
            MYSQL_DATABASE: 'db_test_laravel',
          },
          ports: ['33306:3306'],
          options:
            '--health-cmd="mysqladmin ping"\n--health-interval=10s\n--health-timeout=5s\n--health-retries=3%',
        },
      },
    }
  }

  const getEnv = () => {
    return {
      env: {
        DB_CONNECTION: 'mysql',
        DB_DATABASE: 'db_test_laravel',
        DB_PORT: '33306',
        DB_USER: 'root%',
      },
    }
  }

  const getPhpVersion = (phpVersion: Form['php_version']) => {
    return [
      {
        uses: 'actions/checkout@v4',
        name: 'Set up PHP',
        with: {
          'php-version': `${phpVersion}%`,
        },
      },
    ]
  }

  const cachePhpDependencies = () => {
    return [
      {
        name: 'Cache PHP dependencies',
        uses: 'actions/cache@v4',
        with: {
          path: `vendor\n~/.composer/cache`,
          key: `\${{ runner.os }}-php-\${{ hashFiles('**/composer.lock') }}`,
          'restore-keys': `\${{ runner.os }}-php-%`,
        },
      },
    ]
  }

  const installDependencies = () => {
    return [
      {
        name: 'Install Dependencies',
        run: 'composer install --no-interaction --prefer-dist --optimize-autoloader%',
      },
    ]
  }

  const prepareApplicationEnvironment = () => {
    return [
      {
        name: 'Prepare Application Environment',
        run: `cp .env.example .env\nphp artisan key:generate\nchmod -R 755 storage bootstrap/cache%`,
      },
    ]
  }

  const getNodeVersion = (nodeVersion: Form['node_version']) => {
    return [
      {
        uses: 'actions/setup-node@v4',
        name: 'Set up Node.js',
        with: {
          'node-version': `${nodeVersion}%`,
        },
      },
    ]
  }

  const installNodeDependencies = () => {
    return [
      {
        name: 'Install Node dependencies',
        run: 'npm ci%',
      },
    ]
  }

  const buildAssets = () => {
    return [
      {
        name: 'Build assets',
        run: 'npm run build%',
      },
    ]
  }

  const migrateDatabase = () => {
    return [
      {
        name: 'Migrate Database',
        run: 'php artisan migrate%',
      },
    ]
  }

  const getTest = (test: Form['test']) => {
    if (!test) {
      return []
    }

    return [
      {
        name: 'Run Tests',
        run:
          test === 'phpunit'
            ? 'vendor/bin/phpunit --testdox%'
            : 'vendor/bin/pest --parallel%',
      },
    ]
  }

  const getStaticAnalysis = (staticAnalysis: Form['static_analysis']) => {
    if (!staticAnalysis) {
      return []
    }

    return [
      {
        name: 'Run Static Analysis',
        run: 'vendor/bin/phpstan analyse app --level=5',
      },
    ]
  }

  const yaml = computed(() => {
    return stringify(
      {
        ...getName(form.value.name),
        ...getTriggers(form.value.triggers),
        jobs: {
          tests: {
            name: 'Run tests',
            'runs-on': 'ubuntu-latest',
            ...getDatabase(form.value.database_version),
            ...getEnv(),
            steps: [
              ...getPhpVersion(form.value.php_version),
              ...cachePhpDependencies(),
              ...installDependencies(),
              ...prepareApplicationEnvironment(),
              ...getNodeVersion(form.value.node_version),
              ...installNodeDependencies(),
              ...buildAssets(),
              ...migrateDatabase(),
              ...getTest(form.value.test),
              ...getStaticAnalysis(form.value.static_analysis),
            ],
          },
        },
      },
      {
        singleQuote: true,
      },
    ).replaceAll('%', '\n')
  })

  return {
    form,
    yaml,
  }
}
