<template>
    <div class="box">
        {{name}}:{{age}}
        <img src="../assets/images/6.jpeg" alt="">
    </div>
</template>
<script>
import {mapState} from 'vuex';
export default {
    computed:{
        ...mapState(['name','age'])
    }
}
</script>
<style lang="scss" scoped>
   @import '../assets/css/home';
   .box{color: red;border: 3px solid brown;
        img{
            width: 60px;height: 60px;display: block;
        }
    }
</style>