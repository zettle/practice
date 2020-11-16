<template>
    <div class="app">
        <!-- 搜索输入框 -->
        <div class="search-input">
            <i class="iconfont icon-search"></i>
            <input 
                v-model="searchWord" 
                @input="searchHandler" 
                @keyup.enter="handleToList(searchWord)"
                type="text" 
                placeholder="搜索歌曲" />
            <i class="iconfont icon-del" @click="handleToClose"></i>
        </div>

        <!-- 搜索历史 + 热搜榜 -->
        <template v-if="searchType === 1">
            <div class="search-history">
                <div class="search-history-head">
                    <span>历史记录</span>
                    <i class="iconfont icon-del1" @click="handleToClear"></i>
                </div>
                <ul class="search-history-list">
                    <li v-for="(item, $i) of searchHistory" :key="$i" @click="handleToList(item)">{{item}}</li>
                </ul>
            </div>
            <div class="search-hot">
                <div class="search-hot-head">热搜榜</div>
                <div class="search-hot-item" v-for="(item, $i) of searchHot" :key="$i">
                    <div class="search-hot-top">{{$i + 1}}</div>
                    <div class="search-hot-word">
                        <section>{{item.searchWord}} <img :src="item.iconUrl" alt=""></section>
                        <section>{{item.content}}</section>
                    </div>
                    <span class="search-hot-count">{{item.score}}</span>
                </div>
            </div>
        </template>

        <!-- 搜索匹配到的关键词 -->
        <div v-else-if="searchType === 2" class="search-suggest">
            <div class="search-suggest-head">搜索“{{searchWord}}”</div>
            <div class="search-suggest-item" 
                v-for="(item, $i) of searchSuggest" :key="$i"
                @click="handleToList(item.keyword)">
                <i class="iconfont icon-search"></i>{{item.keyword}}
            </div>
        </div>

        <!-- 搜索匹配到的列表 -->
        <div v-else-if="searchType === 3" class="search-result">
            <div class="search-result-item" v-for="(item, $i) of searchList" :key="$i">
                <div class="search-result-word">
                    <p>{{item.name}}</p>
                    <p>{{item.artists[0].name}}-{{item.album.artist.name}}</p>
                </div>
                <i class="iconfont icon-bofang"></i>
            </div>
        </div>

        <child></child>
    </div>
</template>

<script lang="ts">
import '@/assets/font/iconfont.css';
import axios from 'axios';
import { defineComponent, onMounted, reactive, ref, Ref, toRefs } from "vue";
import Child from './components/Child.vue';
import { provideSotre } from './useSearchWord';

type searchTypeDeclare = 1 | 2 | 3;

// 热门搜索的功能 提取到hook
// 使用ref来实现响应式
function useSearchHot() {
    const searchHot = ref([]); // 要展示在页面上的热搜列表
    onMounted(async() => {
        const resp = await axios.get('/api/search/hot/detail');
        searchHot.value = resp.data.data;
    });
    return { searchHot }
}

// 搜索功能
// 使用reactive toRefs实现响应式
function useSearchSuggest(searchWord: Ref<string>, searchType: Ref<searchTypeDeclare>) {
    const state = reactive({
        searchSuggest: [] // 匹配到的关键词列表
    });

    // 绑定到 input 的 @input上
    const searchHandler = async () => {
        if (!searchWord.value) { // 搜索input内容为空的，就不调接口了
            searchType.value = 1;
            return false;
        }
        const resp = await axios.get('/api/search/suggest', { params: { keywords: searchWord.value, type: 'mobile' } })
        state.searchSuggest = resp.data.result.allMatch;
        searchType.value = 2;
    };
    return {
        ...toRefs(state),
        searchHandler
    };
}

// 搜索结果列表
function useSearchList (searchWord: Ref<string>, searchType: Ref<searchTypeDeclare>, setToHistory: (word: string)=>void) {
    const searchList = ref([]); // 结果列表

    // 清除搜索内容
    const handleToClose = () => {
        searchWord.value = '';
        searchType.value = 1;
    }; 
    // 调用接口搜索
    const getSearchList = async () => {
        const resp = await axios.get('/api/search', { params: { keywords: searchWord.value } });
        searchList.value = resp.data.result.songs;
        searchType.value = 3;
    };

    // 点击去到结果列表页
    const handleToList = (word: string) => {
        searchWord.value = word; // 复制到input里面去
        setToHistory(word); // 存到缓存中
        getSearchList();
    };

    return { searchList, handleToClose, handleToList };
}

// 搜索历史功能
function useSearchHistory () {
    const searchHistory: Ref<string[]> = ref([]);
    // 清除历史记录
    const handleToClear = () => {
        removeStorage('searchHistory');
        searchHistory.value = [];
    };
    // 设置storage
    const setToHistory = (word: string) => {
        searchHistory.value.unshift(word);
        searchHistory.value = Array.from(new Set(searchHistory.value)); // 去重
        setStorage('searchHistory', searchHistory.value); // 存缓存
    };

    // 一挂载就从storage获取数据
    onMounted(() => {
        const storageHistoryList = getStorage<string[]>('searchHistory');
        if (storageHistoryList) {
            searchHistory.value = storageHistoryList;
        }
    });

    return { searchHistory, handleToClear, setToHistory };
}

// 设置localStorage
function setStorage<T> (key: string, data: T) {
    window.localStorage.setItem(key, JSON.stringify(data));
}
// 获取localStorage
function getStorage<T> (key: string): null | T {
    const data = window.localStorage.getItem(key);
    if (!data) {
        return null;
    }
    return JSON.parse(data);
}
// 移除localStorage
function removeStorage (key: string) {
    window.localStorage.removeItem(key);
}


export default defineComponent({
    components: {
        Child
    },
    setup() {
        const searchType: Ref<searchTypeDeclare> = ref(1); // 要切换成哪个页面 1-搜索历史+热搜榜 2-搜索匹配到的关键词 3-搜索匹配到的列表
        const searchWord = ref(''); // 用户输入的关键词

        provideSotre(searchWord);

        const { searchHot } = useSearchHot(); // 热搜列表
        const { searchSuggest, searchHandler } = useSearchSuggest(searchWord, searchType); // 搜索匹配关键词
        const { searchHistory, setToHistory, handleToClear } = useSearchHistory(); // 搜索历史
        const { searchList, handleToClose, handleToList } = useSearchList(searchWord, searchType, setToHistory); // 搜索结果

        return { 
            searchType, searchWord,
            searchHot,
            searchSuggest, searchHandler,
            searchList, handleToClose, handleToList,
            searchHistory, handleToClear
        };
    },
});
</script>
<style>
* { margin: 0; padding: 0; }
</style>
<style lang="scss" scoped>
// 搜索输入框
.search-input {
    display: flex;
    align-items: center;
    height: 35px;
    margin: 35px 15px 25px 15px;
    background: #f7f7f7;
    border-radius: 25px;

    i {
        margin: 0 13px;
    }

    input {
        flex: 1;
        font-size: 14px;
        border: none;
        background: #f7f7f7;
        outline: none;
    }

    .icon-del {
        color: #ccc;
        font-size: 10px;
    }
}

// 搜索历史
.search-history {
    margin: 0 15px 25px 15px;
    font-size: 14px;

    .search-history-head {
        display: flex;
        justify-content: space-between;
        margin-bottom: 18px;
    }

    .search-history-list {
        display: flex;
        flex-wrap: wrap;

        li {
            list-style: none;
            padding: 8px 14px;
            border-radius: 20px;
            margin-right: 15px;
            margin-bottom: 15px;
            background: #f7f7f7;
        }
    }
}

// 热搜
.search-hot {
    margin: 0 15px;
    font-size: 14px;

    .search-hot-head {
        margin-bottom: 18px;
    }

    .search-hot-item {
        display: flex;
        align-items: center;
        margin-bottom: 29px;
    }
    .search-hot-top {
        color: #fb2222;
        width: 30px;
        margin-left: 4px;
    }

    .search-hot-word {
        flex: 1;
        section:nth-child(1) {
            font-size: 16px;
            color: black;
        }
        section:nth-child(2) {
            font-size: 12px;
            color: #878787;
        }

        img {
            height: 14px;
        }

        .search-hot-count {
            color: #878787;
        }
    }
}

// 搜索匹配到的关键词
.search-suggest {
    border-top: 1px #e4e4e4 solid;
    padding: 15px;
    font-size: 14px;

    .search-suggest-head {
        color: #4574a5;
        margin-bottom: 37px;
    }

    .search-suggest-item {
        color: #5d5d5d;
        margin-bottom: 37px;
    }

    i {
        color: #bdbdbd;
        margin-right: 14px;
        position: relative;
        top: 1px;
    }
}


// 搜索匹配到的歌曲列表
.search-result {
    border-top: 1px #e4e4e4 solid;
    padding: 15px;
    .search-result-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 15px;
        margin-bottom: 15px;
        border-bottom: 1px #e4e4e4 solid;
    }
    .icon-bofang {
        font-size: 22px;
    }
    .search-result-word {
        p:nth-child(1) {
            font-size: 16px;
            color: #235790;
            margin-bottom: 6px;
        }
        p:nth-child(2) {
            font-size: 14px;
            color: #898989;
        }

        i {
            font-size: 30px;
            color: #878787;
        }
    }
}
</style>