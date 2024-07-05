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
        type: 'on push',
      },
      {
        enabled: false,
        type: 'on pull request',
      },
    ],
    database: 'mysql',
    database_version: '8.0',
    php_version: '8.3',
    node_version: 20,
    test: 'phpunit',
    static_analysis: null,
  })

  const getTriggers = (triggers: Form['triggers']) => {
    const output = {}

    triggers
      .filter((trigger) => trigger.enabled)
      .forEach((trigger) => {
        if (trigger.type === 'on push') {
          set(output, 'on.push.branches', ['main'])
        }

        if (trigger.type === 'on pull request') {
          set(output, 'on.pull_request.branches', ['main'])
        }
      })

    return output
  }

  const getDatabase = (database: Form['database']) => {
    return {
      services: {
        mysql: {
          image: 'mysql:latest',
          env: {
            MYSQL_ALLOW_EMPTY_PASSWORD: 'yes',
            MYSQL_DATABASE: 'db_test_laravel',
          },
          ports: ['33306:3306'],
          healthcheck: {
            retries: 3,
            timeout: '5s',
          },
        },
      },
    }
  }

  const getPhpVersion = (phpVersion: Form['php_version']) => {
    return [
      {
        uses: 'actions/checkout@v4',
        name: 'Set up PHP',
        with: {
          'php-version': `${phpVersion}`,
        },
      },
    ]
  }

  const getNodeVersion = (nodeVersion: Form['node_version']) => {
    return [
      {
        uses: 'actions/setup-node@v4',
        name: 'Set up Node.js',
        with: {
          'node-version': `${nodeVersion}`,
        },
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
            ? 'vendor/bin/phpunit --testdox'
            : 'vendor/bin/pest --parallel',
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
    return stringify({
      name: form.value.name,
      ...getTriggers(form.value.triggers),
      ...getDatabase(form.value.database),
      steps: [
        ...getPhpVersion(form.value.php_version),
        ...getNodeVersion(form.value.node_version),
        ...getTest(form.value.test),
        ...getStaticAnalysis(form.value.static_analysis),
      ],
    })
  })

  return {
    form,
    yaml,
  }
}
