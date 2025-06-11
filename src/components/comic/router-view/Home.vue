<!-- 功能: 简单显示下图片 -->
<template>
  <div>首页</div>
  <div>
    <!-- 图片1 -->
    <van-image src="https://sexcomic.s3.ap-northeast-1.amazonaws.com/%E5%85%85%E6%BB%A1%E5%90%84%E7%A7%8D%E5%8F%98%E6%80%81%E8%A1%8C%E4%B8%BA%E7%9A%84%E5%AE%B6-1.jpg?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLW5vcnRoZWFzdC0xIkcwRQIhAOYGshO6Tq8In8qMHc1rmYyNzT%2BUZ4tHDG6RsUwo38jLAiBztQM8K5xtlEq%2Bj%2B34JUA5E3C49ATbCviSCCSi7T8nECrCAwjR%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAEaDDAzNzYzOTczMzQyMCIMa5w4eU5RM6V2pojiKpYDnHNJyuAJGhsOVQ5gx2NMCesp6YXkk6Fu9Le1%2FIGmV%2BI%2F9FUNXQLMQW2u87K8meMfjMljI4Z7b7ViY4IxB%2Bc%2F6Jr15CKzQwVuZENgyX3hzC5evwfxLjViwrTF2W7RjBopxPXAZzSWHKHRox%2FZDxDL0b9PbgkGb0lkKsJzvenGDzzCdNZPanaKst4w7ZOp%2BTj8gdoXemx2y%2BX6G1V6LaD3tQAcBIOwrdDLYumKW4woDkBnZrqBHbicWOPI9CveD1tv7eIM%2FyGpFm5vxUCjc89xUpSQIbxNF4ne3aWEdGMviagfQo14QTZSNiuJsaTv0uM35yhaoOEJQZxYoa7sciy8EuJBcugT8wvnkwbnHiH2WAgbhywDHHarmyWh8VVlUC%2FkVzFDxUn4CiLggPgy%2BXcuS7dltGfwWufMVskFIlvg6jfY6wzp8fWnZCMFLpRnmuYcmklpAtxWryr8W0Gug9Jjy26zaWyeBEy0mqmlioesqJ8C28%2BU%2BPpLudXy4dIW9bj3dtiOdJ7KmxqygibWdCtOYp3iyZswrTCD3KPCBjreAkCrzddWqWmpkWqvZP2H2k6uOVmn1fQOzyT6f7ObbLzoRrdcITkya4z1Dcxd7ND12hYhYt%2BIogm%2BekfgijcxrYJGeUKA%2BU1Zv58e824cwZMOdFvUmqUyG9js0wGaYRcJzoR29%2BTAX6onQs%2F3XRyE0pidJDgOZY7%2BN2t7bpYouUN5smVg%2FOFBgIazgKEo0Ly4OdM8hbfv6RqcfzCjGLDRJqoo7wl8lC17b2M9OzoLniywEs0kcwbCK9WK2hLigsqZsUaOiY4ZsZ4C4aFcQ24BQr2oultM1mfk2ciwnQWaV6FzIKQXG%2BN4Q%2BNs5YgQC%2Bz%2BPZe0gZDH1Wv%2FmqVsOazmHelvb%2B93E%2BmQcQkX8OC7qHIMMyX6NBMGDxJWdgCHAuOaLG4o8k1TBXTXO78zzgDKp44gFFH1UVF8PLaNXok2P4pugQPsMXLkrhjjgM7F60s%2BF9EO20yGe%2FDfBBFh6z6g&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAQRQ4AYCWLXLDSHXA%2F20250611%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20250611T073449Z&X-Amz-Expires=43200&X-Amz-SignedHeaders=host&X-Amz-Signature=fb6847ac0a4ea35a583b9c0a0ea22b543c528d911f76b23372634c6b17819243" 
      width="100%"
      height="container"
      fit="cover"
      alt="" >
      <template v-slot:loading> <van-loading type="spinner" size="40" /> </template>
    </van-image>

    <!-- 图片2 -->
    <van-image src="https://sexcomic.s3.ap-northeast-1.amazonaws.com/%E5%85%85%E6%BB%A1%E5%90%84%E7%A7%8D%E5%8F%98%E6%80%81%E8%A1%8C%E4%B8%BA%E7%9A%84%E5%AE%B6-2.jpg?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLW5vcnRoZWFzdC0xIkcwRQIhAJu541ERsrLCIVCsuZMgWzqPWgtsXEC9h089YY6X%2FT%2FZAiBhkvHglTPpI%2BF%2Fe68IFyjqfMmUog1YsJKxc0AaQzSvsirCAwjS%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAEaDDAzNzYzOTczMzQyMCIMqvsbsyzkVKAbOJYnKpYDo60fGmbK4KiN%2BlK5eX3daSBAQuZLdSJbt1J%2F4UvjsMGS0rHSZMr1cWb8W4woMU%2BjnH9%2BLTcCd%2BAJ%2FGZmzN1CL4GKG%2BD48tsuTDJJDyk%2FBTiTmDMtmuxJmZoBxhoSRmFUqZ4ll0TueF5qm7iw2eaXskkraGwVR9ELhILlN%2Bf8pJ24wZI859grOdTHmJRqlfIrpV4lwGFtqNQe8SCac4tJBARnxiYONn425sF97Oc8FukuyfFQklSpVKLHQ%2Brpl6%2FeiBntTlc9W71JXGtUtyjJFp1qa0tj8%2BGo%2FDxki9oUL4K6uj1vXUgjUCXYG3zLN0FS2553PsiRe6Lg2ErcXGSwP4Qfhu42gfutJHtMcAERhDfMnpZZSJ16Ep10Ft0072nNgrgRbgn0UTErdsFGa5rtd47DLmhMZ2AiPYrgm2AApTcdx1AtGjO6Uk%2FcoLIayaIR88R%2BjQ5fCQ3HCFGJvixPVRlNbVVUR63D83tbU8trfgp3r8rZyfNNxpZeJ%2B6%2FITCXFV4AlS1AS5eQUCcVWTsA4ZFWT1zpMTCD3KPCBjreAri%2BkXccHntD2GwBNcT0%2ByEkzEiz%2F615WP7Rkc8e1u59acRmyx5Ng6XliGJGoRo9kmyfOFzatFAhYa%2BaMLDjVh31JRR3rXTY0queHqSj98%2FoFigWz6uLEC9pufr7ZSw7SALONAKBKznXfoj5BxZEc1rlwTSGuLepTVW%2F6MZnU3OcdctR8p2DTPswHoUS2l11tNZAqxG4b%2BfoYvJ5ljbANKTxLviyTtzi%2Bfa6Yq9cr0d747gk0OVwvaNK85kggC8o2Dr3Ycw6tpQZ0VHdBsF0jTqcbbbzTy8OPtPe5de%2Fd1HHzqmS4We2K9rAEMfHWI%2F55ohrPplSmZjx75s3p6aH%2FwKLQ7xyLEhwDV6AwU%2FXPy9djITCMfu1PXiKKiJesUqKZzYRUTcf9fSYmQ3lvST7pUDpSlONB1dc151%2BuoM1%2FASlzdVCujEyLZ2MHDAnr6FC8bOIn6LZ2vICzWCRVMtf&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAQRQ4AYCWICY3SF3N%2F20250611%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20250611T085429Z&X-Amz-Expires=43200&X-Amz-SignedHeaders=host&X-Amz-Signature=2c2d5834304b68c5e88e79b38261220d69cd2e468e9a0b9e745d046069ba0aab" 
      width="100%"
      height="container"
      fit="cover"
      alt="" >
      <template v-slot:loading> <van-loading type="spinner" size="40" /> </template>
    </van-image>
  </div>
  
</template>