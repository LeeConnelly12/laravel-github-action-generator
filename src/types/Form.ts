interface Trigger {
  label: 'on push' | 'on pull request'
  type: 'on_push' | 'on_pull_request'
  enabled: boolean
}

interface Form {
  name: string
  triggers: Trigger[]
  database: 'mysql'
  database_version: '8.0'
  php_version: '8.3' | '8.2' | '8.1' | '8.0'
  node_version: 20
  test: null | 'phpunit' | 'pest'
  static_analysis: null | 'larastan'
}

export type { Form, Trigger }
