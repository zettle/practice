<template>
    <div class="row">
        <div class="col-4 mb-4">
            <div class="card h-100 shadow-sm">
                <div class="card-body text-center">
                    <img class="rounded-circle border border-light my-3" src="http://jruat.midea.com/supplier/static/img/swiper-5.b720031.png" />
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text text-left">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="btn btn-outline-primary">Go somewhere</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'Home',
    props: {
        name: String
    },
    setup (props) {
        console.log(props.name);
    }
});
</script>

<style lang="scss" scoped>
.card-body  {
    img{
        width: 50px;
        height: 50px;
    }
}
</style>
