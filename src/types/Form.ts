type Trigger = 'on_push' | 'on_pull_request' | 'on_schedule'

type Test = 'phpunit' | 'pest'

type StaticAnalysisTool = 'larastan' | 'phpstan'

type Form = {
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
