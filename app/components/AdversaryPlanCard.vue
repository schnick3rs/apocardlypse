<script setup lang="ts">
import type {AbstractCard} from "~~/types/cards";

const { card, scale } = defineProps<{ card: AbstractCard, scale: number }>();

const cardImage = computed(() => {
  if (card.imageUrl) {
    return {
      backgroundImage: `url(${card.imageUrl})`,
      top: `${11 * scale}mm`
    }
  }
  const placeholderImageUrl = `/img/placeholder-plan.jpg`
  return {
    backgroundImage: `url(${placeholderImageUrl})`,
    top: `${11 * scale}mm`
  }
})

const cardDimensions = computed(() => {
  return {
    height: `${88*scale}mm`,
    width: `${63.2*scale}mm`,
    fontSize: `${3.2*scale}mm`,
  }
})

const nameStyle = computed(() => {
  return {
    top: `${2*scale}mm`,
    marginLeft: `${12*scale}mm`,
    fontSize: `${4*scale}mm`,
    padding: `${2*scale}mm ${3*scale}mm`,
  }
})

const costStyle = computed(() => {
  return {
    top: `${2*scale}mm`,
    height: `${8*scale}mm`,
    width: `${8*scale}mm`,
  }
})

const tagsStyle = computed(() => {
  return {
    top: `${84*scale}mm`,
    right: `${2*scale}mm`,
    width: `${40*scale}mm`,
    fontSize: `${3.2*scale}mm`,
  }
})


const textStyle = computed(() => {
  return {
    top: `${84*scale}mm`,
    right: `${8*scale}mm`,
    width: `${40*scale}mm`,
    fontSize: `${3.2*scale}mm`,
    lineHeight: `${3.6*scale}mm`,
    padding: `${2*scale}mm`,
  }
})

const statsContainerStyle = computed(() => {
  return {

    top: `${84*scale}mm`,
    left: `${-18-2*scale}mm`,
    width: `${40*scale}mm`,
    fontSize: `${3.2*scale}mm`,
    padding: `${2*scale}mm`,
  }
})

const statWrapperStyle = computed(() => {
  return {
    margin: `0 ${2*scale}mm`,
  }
})

const statStyle = computed(() => {
  return {
    padding: `0 ${4*scale}mm`,
  }
})

const statLabelStyle = computed(() => {
  return {
    marginTop: `${0.4*scale}mm`,
    fontSize: `${3*scale}mm`,
  }
})

const footerStyle = computed(() => {
  return {
    bottom: 0,
    fontSize: `${2.8*scale}mm`,
  }
})
</script>

<template>
  <article class="card" :style="cardDimensions">

    <!-- card specific background image -->
    <div class="layer layer-image rotate-90 origin-cente" :style="cardImage"></div>

    <!-- card Stain -->
    <div class="layer layer-stain--top"></div>
    <div class="layer layer-stain--bottom"></div>

    <!-- frame -->

    <div
        v-if="card.cost !== undefined"
        class="cost bg-amber-400 shadow-lg shadow-amber-400/50 rounded-full flex items-center justify-center font-mono font-bold"
        :style="costStyle"
    >
      {{ card.cost }}
    </div>

    <div v-if="card.name" class="name w-3/4 bg-cyan-900 shadow-lg shadow-cyan-900/50 rounded-lg" :style="nameStyle">{{ card.name }}</div>

    <div
        class="tags w-full absolute text-center font-bold rotated-right"
        :style="tagsStyle"
    >
      {{ card.tags.join(' · ') }}
    </div>

    <div
        v-if="card.text"
        class="text w-full absolute rotated-right"
        :style="textStyle"
    >
      {{ card.text }}
    </div>

    <div
        class="stats absolute rotated-right flex items-center justify-center font-mono w-full"
        :style="statsContainerStyle"
    >
      <div class="stat-wrap flex flex-col items-center" :style="statWrapperStyle">
        <div class="stat bg-yellow-300 shadow-lg shadow-yellow-300/50 rounded-sm" :style="statStyle">
          {{ card.planning }}
        </div>
        <div class="label opacity-70" :style="statLabelStyle">Plan</div>
      </div>
    </div>

    <div class="footer w-full absolute text-center" :style="footerStyle">
      {{card.sourceName}} · {{card.sourceType}} · {{card.layout}}
    </div>

  </article>
</template>

<style scoped>
:root{
  --badge-padding: 0.35rem 0.7rem;
  --badge-radius: 10px;            /* slightly round */
  --badge-font-size: 0.9rem;
  --badge-shadow: 0 6px 18px rgba(0,0,0,0.18); /* drop shadow */
  --badge-text-shadow: 0 1px 0 rgba(0,0,0,0.15);
}

.card {
  overflow: hidden;
  position: relative;
  float: left;
  display: block;
  page-break-inside: avoid;
}

.card.cutter {
  border-color: red;
  border-width: 0.2mm;
  border-style: dashed;
  width: 63.1mm;
  height: 87.6mm;
}

.layer {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;

  &--blend {
    clip-path: inset(1.5mm 1.5mm 1.5mm 1.5mm round 3mm);
  }

  &--modifer {
    left: -0.7mm;
  }
}

.layer-image {
  position: absolute;
  height: 47%;
}

.layer-stain {
  background-image: url('/img/stain-center-medium.png');
}

.layer-stain--top {
  background-image: url('/img/stain-top-medium.png');
}

.layer-stain--bottom {
  background-image: url('/img/stain-bottom-small.png');
}

.cost {
  position: absolute;
  top: 2mm;
  left: 2mm;
}

.name {
  position: absolute;
  line-height: 1;                 /* keeps it single-line */
  white-space: nowrap;            /* force single line */

  color: white;
}


.text {
  position: absolute;
}

.stats {
  position: absolute;
}

.rotated-right {
  transform: rotate(90deg);
  transform-origin: top right;
}

</style>
