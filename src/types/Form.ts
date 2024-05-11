type TriggerType = 'on push' | 'on pull request'

interface Trigger {
  type: TriggerType
  enabled: boolean
}

type Test = 'phpunit' | 'pest'

type StaticAnalysisTool = 'larastan' | 'phpstan'

interface Form {
  name: string
  triggers: Trigger[]
  database: 'mysql'
  database_version: 8.0
  php_version: 8.3 | 8.2 | 8.1 | 8.0
  node_version: 20
  tests: Test[]
  static_analysis: StaticAnalysisTool[]
  deployment: 'digital_ocean'
}

export type { Form }
