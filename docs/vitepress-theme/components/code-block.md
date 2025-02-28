# Code blocks

## Basic code block

<ComponentPreview>

```
# Code block with no language specified
echo "Why did the programmer quit his job?
echo "He didn't get arrays!"
```

</ComponentPreview>

<ComponentPreview>

```javascript
const caffeine = '☕'.repeat(5)
const developer = '🧟‍♂️'
console.log(`${developer} + ${caffeine} = ${developer.replace('🧟‍♂️', '🦸‍♂️')}`)
// Output: 🧟‍♂️ + ☕☕☕☕☕ = 🦸‍♂️
```

</ComponentPreview>

## Code block with file name

<ComponentPreview>

::: code-group

```js [murphy.js]
import { createMurphysLaw } from 'vue'
import BugGenerator from './BugGenerator.vue'

// Murphy's Law of Programming:
// Anything that can go wrong, will go wrong... during the demo
const murphy = createMurphysLaw({
  timing: 'always-during-presentations',
  severity: 'maximum-embarrassment'
})
murphy.start('#app')
```

:::

</ComponentPreview>

## Code group blocks

<ComponentPreview>

::: code-group

```vue [CoffeeCounter.vue]
<script setup lang="ts">
import { useCoffeeTracking } from './coffee'
import './coffee.css'

const { coffeeCount, addCoffee, productivity } = useCoffeeTracking()
</script>

<template>
  <div class="coffee-tracker">
    <button @click="addCoffee">Add ☕</button>
    <div>Coffees today: {{ coffeeCount }}</div>
    <div>Productivity level: {{ productivity > 9000 ? '🚀' : '🐌' }}</div>
  </div>
</template>
```

```ts [coffee.ts]
import { computed, ref } from 'vue'

export function useCoffeeTracking() {
  const coffeeCount = ref(0)
  const productivity = computed(() => coffeeCount.value * 2000)

  function addCoffee() {
    coffeeCount.value++
    if (coffeeCount.value > 5) {
      console.warn('⚠️ Caffeine overload imminent!')
    }
  }

  return {
    coffeeCount,
    productivity,
    addCoffee
  }
}
```

```css [coffee.css]
.coffee-tracker {
  padding: 1rem;
  border-radius: 8px;
  background: #1a1a1a;
  color: #fff;
  /* The darker the theme, the more productive the code */
}

.coffee-tracker button {
  background: #4a3725; /* Coffee-colored, naturally */
  transition: transform 0.3s;
}

.coffee-tracker button:hover {
  transform: scale(1.1);
  /* Warning: Excessive clicking may cause jitters */
}
```

:::

</ComponentPreview>

## Line annotations

<ComponentPreview>

```rust
fn main() {
    println!("Why do Rust developers never get lost? Because they have ownership!"); // [!code highlight]
}
```

</ComponentPreview>

<ComponentPreview>

```js
export default {
  data() {
    return {
      excuses: 'It works on my machine', // [!code --]
      reality: 'It works on production!', // [!code ++]
    }
  }
}
```

</ComponentPreview>

> We don't support 100% the annotations from Vitepress. If you would like to see a specific annotation supported, please open an issue.

## Credits

- Design inspired by Prompt Kit [code block](https://prompt-kit.com/docs/code-block) component.
- HTML structure by [Vitepress](https://vitepress.dev) Markdown extension.
- Syntax highlighting by [Shiki](https://shiki.style).
