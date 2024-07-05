<script setup lang="ts">
import { useYamlOutput } from '@/composable/useYamlOutput'

const { form, yaml } = useYamlOutput()
</script>

<template>
  <main class="container mx-auto px-6 py-12 lg:max-w-6xl lg:py-16">
    <h1 class="text-center text-xl md:text-3xl">
      <strong class="text-red-500">Laravel</strong> Github action generator
    </h1>
    <div class="gap-8 lg:mt-8 lg:grid lg:grid-cols-2 xl:grid-cols-[2fr_3fr]">
      <form class="mt-6 lg:mt-0">
        <div>
          <label for="name">Name</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            class="mt-2 w-full rounded-md border border-gray-200 shadow-sm"
            placeholder="Enter name"
          />
        </div>
        <div class="mt-6">
          <p>Triggers</p>
          <div class="mt-3 grid gap-3">
            <label
              v-for="trigger in form.triggers"
              class="flex items-center gap-2"
            >
              <input
                v-model="trigger.enabled"
                type="checkbox"
                :value="true"
                id="on_push"
              />
              <span>{{ trigger.type }}</span>
            </label>
          </div>
        </div>
        <div class="mt-6">
          <label for="database">Database</label>
          <select
            v-model="form.database"
            id="database"
            class="mt-2 w-full rounded-md border border-gray-200 shadow-sm"
          >
            <option value="mysql">MySQL</option>
          </select>
        </div>
        <div class="mt-6">
          <label for="mysql_version">MySQL version</label>
          <select
            v-model="form.database_version"
            id="mysql_version"
            class="mt-2 w-full rounded-md border border-gray-200 shadow-sm"
          >
            <option value="8.0">8.0</option>
          </select>
        </div>
        <div class="mt-6">
          <label for="php_version">PHP version</label>
          <select
            v-model="form.php_version"
            id="php_version"
            class="mt-2 w-full rounded-md border border-gray-200 shadow-sm"
          >
            <option value="8.3">8.3</option>
            <option value="8.2">8.2</option>
            <option value="8.1">8.1</option>
          </select>
        </div>
        <div class="mt-6">
          <label for="node_version">Node version</label>
          <select
            v-model="form.node_version"
            id="node_version"
            class="mt-2 w-full rounded-md border border-gray-200 shadow-sm"
          >
            <option value="20">20</option>
          </select>
        </div>
        <div class="mt-6">
          <p>Test</p>
          <div class="mt-3 grid gap-3">
            <label class="flex items-center gap-2">
              <input v-model="form.test" type="radio" :value="null" />
              <span>None</span>
            </label>
            <label class="flex items-center gap-2">
              <input v-model="form.test" type="radio" value="phpunit" />
              <span>PHPUnit</span>
            </label>
            <label class="flex items-center gap-2">
              <input v-model="form.test" type="radio" value="pest" />
              <span>Pest</span>
            </label>
          </div>
        </div>
        <div class="mt-6">
          <p>Static analysis</p>
          <div class="mt-3 grid gap-3">
            <label class="flex items-center gap-2">
              <input
                v-model="form.static_analysis"
                type="radio"
                :value="null"
              />
              <span>None</span>
            </label>
            <label class="flex items-center gap-2">
              <input
                v-model="form.static_analysis"
                type="radio"
                value="larastan"
              />
              <span>Larastan</span>
            </label>
            <label class="flex items-center gap-2">
              <input
                v-model="form.static_analysis"
                type="radio"
                value="phpstan"
              />
              <span>PHPStan</span>
            </label>
          </div>
        </div>
      </form>
      <pre
        class="mt-6 w-full rounded-md border border-gray-200 bg-white px-4 py-4 shadow-sm lg:mt-0"
      ><code class="font-fira-code">{{ yaml }}</code></pre>
    </div>
  </main>
</template>
