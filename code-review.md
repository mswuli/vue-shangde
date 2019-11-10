### 文件命名问题
1. 图片文件中出现两种命名方式：`c-bg1.png` 和 `curriculum1.text.c.png`
2. `less`文件的命名都用了 `_` 作为前缀的原因是？

3. `store` 目录中的文件采用了下划线

4. vue组件的文件名称有两个单词小写在一起的`classlist.vue`还有驼峰的`tabList.vue`

### 组件报错
1. `App.vue` 中的 `<lg-preview>` 报错。

### JS代码问题
1. `var` 与 `const` `let` 混用，建议不使用`var`。
2. 由于这句话无法区分数据类型到底`Object` 还是 `Array`，建议采用更加明确的判断方式。如果希望同时判断两种数据类型，分别进行两个类型的判断。 
```javascript
if (data instanceof Object){} // 现在
if (data.constructor === Object || Array.isArray(data)){} // 改进
```

3. `util.js` 未使用变量没有删除。
```javascript
setItem: function (name, data) {
  if (data instanceof Object) {
    let val = JSON.stringify(data) // 未使用
    localStorage.setItem(name, JSON.stringify(data));
  } else {
    localStorage.setItem(name, data);
  }
},
```
4. vuex使用错误，正确的做法是业务逻辑中只能通过 `dispatch` `action` 的方式去调用，而现在的做法是直接在业务代码中`commit` `mutation`。官方示例：
```javascript
store.dispatch('increment')
```

5. 环境变量需要完善，现在只有 `dev` 和 `prod` 两个环境。

6. 问题看注释。
```javascript
toDetail(id,type){
  let that = this ; 
  that.loginInfo = that.util.getItem("fe-mbaUser") || false; // 这里要表示或者为空值还是或者是错误值？？？
  if(type == 1){  // 用全等！！！还要再说多少次！！
  if(that.loginInfo){
      window.location=`http://smallprogram.sunlands.com/education-app/news/index.html?id=${id}
      &sessionKey=${that.loginInfo.sessionKey}
      &userId=${that.loginInfo.userId}
      &stuId=${that.loginInfo.stuId}`;
    }else{ 
    that.$store.state.login.loginShow=true; // 已经使用了vuex不要直接修改state，用触发action的方式
    }
  }else{
    that.$router.push({ name: 'download'})
  }
}
```

7. axios的方法直接返回的就是promise实例，不用在外面在包裹一层promise。直接如下就可以。
```javascript
get(url, param) {
  return axios({
    method: 'get',
    url,
    params: param,
    cancelToken: new CancelToken(c => {
      cancel = c
    })
  })
},
```

8. 代码的格式美化！使用编辑器自动美化工具。
