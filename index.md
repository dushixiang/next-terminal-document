---
layout: doc
title: Redirecting...
description: Redirecting to the documentation quick start page.
---

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vitepress'

const router = useRouter()

onMounted(() => {
  router.go('/install/container-install')
})
</script>

<meta http-equiv="refresh" content="0; url=/install/container-install">

Redirecting to the documentation entry page...
