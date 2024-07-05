<script setup lang="ts">
import { useYamlOutput } from '@/composable/useYamlOutput'

const { form, yaml } = useYamlOutput()

const copy = () => {
  navigator.clipboard.writeText(yaml.value)
}
</script>

<template>
  <main class="container py-12 lg:py-16">
    <h1 class="text-center text-xl md:text-3xl">
      <strong class="text-red-500">Laravel</strong> Github action generator
    </h1>
    <div class="gap-8 lg:mt-8 lg:grid lg:grid-cols-[2fr_3fr]">
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
        <fieldset class="mt-6">
          <legend>Triggers</legend>
          <div
            v-for="trigger in form.triggers"
            class="mt-3 flex items-center gap-2"
          >
            <input
              v-model="trigger.enabled"
              type="checkbox"
              :value="true"
              :id="trigger.type"
              class="size-5 rounded-md border-gray-200 shadow-sm"
            />
            <label :for="trigger.type" class="capitalize">
              {{ trigger.label }}
            </label>
          </div>
        </fieldset>
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
            <option value="5.7">5.7</option>
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
        <fieldset class="mt-6">
          <legend>Test</legend>
          <div class="mt-3 flex items-center gap-2">
            <input
              v-model="form.test"
              type="radio"
              :value="null"
              id="no_test"
              class="size-5 border-gray-200 shadow-sm"
            />
            <label for="no_test">None</label>
          </div>
          <div class="mt-3 flex items-center gap-2">
            <input
              v-model="form.test"
              type="radio"
              value="phpunit"
              id="phpunit"
              class="size-5 border-gray-200 shadow-sm"
            />
            <label for="phpunit">PHPUnit</label>
          </div>
          <div class="mt-3 flex items-center gap-2">
            <input
              v-model="form.test"
              type="radio"
              value="pest"
              id="pest"
              class="size-5 border-gray-200 shadow-sm"
            />
            <label for="pest">Pest</label>
          </div>
        </fieldset>
        <fieldset class="mt-6">
          <legend>Static analysis</legend>
          <div class="mt-3 flex items-center gap-2">
            <input
              v-model="form.static_analysis"
              type="radio"
              :value="null"
              class="size-5 border-gray-200 shadow-sm"
            />
            <label for="no_static_analysis">None</label>
          </div>
          <div class="mt-3 flex items-center gap-2">
            <input
              v-model="form.static_analysis"
              type="radio"
              value="larastan"
              class="size-5 border-gray-200 shadow-sm"
            />
            <label for="larastan">Larastan</label>
          </div>
        </fieldset>
      </form>
      <div class="relative">
        <pre
          class="relative mt-6 h-full w-full overflow-x-auto rounded-md border border-gray-200 bg-white px-4 py-4 shadow-sm lg:mt-0"
        ><code class="font-fira-code">{{ yaml }}</code></pre>
        <button
          @click="copy"
          type="button"
          class="absolute right-8 top-5 inline-flex gap-1 rounded-full bg-blue-500 py-2 pl-3 pr-4 font-sans font-bold text-white"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" class="size-6">
            <title>Copy to clipboard</title>
            <path
              fill-rule="evenodd"
              d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
              clip-rule="evenodd"
            />
            <path
              fill-rule="evenodd"
              d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z"
              clip-rule="evenodd"
            />
          </svg>
          Copy
        </button>
      </div>
    </div>
  </main>
</template>
