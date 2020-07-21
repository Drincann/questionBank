



# 接口文档

## 文档说明

- 格式说明
  
    > 接口说明表格的结构如下：
    >
    > | method / request URL |
    > | -------------------- |
    > | param1 - description |
    > | param2 - description |
    > | param3 - description |
    >

- 路由结构

  | 一级路由                                    |
  | ------------------------------------------- |
  | /public - 任何客户端均可以访问的接口        |
  | /userAction - 登录后才可以访问的接口        |
  | /teacher - 教师和管理员用户才可以访问的接口 |
  | /admin - 仅管理员用户才可以访问的接口       |

- 其他内容不赘述，见另一文档，内容包含

  - 技术栈说明
  - 前端结构概述及功能分析
  - 后端数据层设计
  - 后端路由设计及详细匹配顺序
  - 后端进度 todols

## 公共接口

### 获取验证码-

- 方法及参数

  | GET /public/captcha |
  | ------------------- |
  | 无参数              |

- 返回 svg 格式验证码数据

### 用户登录-

- 方法及参数

  | POST /public/login    |
  | --------------------- |
  | email - 邮箱          |
  | password - 密码       |
  | verification - 验证码 |

- 返回

  - success

    ```json
    {
        "_id": "5ea40eaaa0fc7a5a34b54651",
        "email": "example@email.com",
        "username": "gaolihaiUnm",
        "avatar": "\uploads\upload_a876c399b4e9682867ca1549926bd714.jpg",
        "role": "student",
        "createTime": "2020-04-25T10:19:22.569Z"
    }
    ```

  - fail

    ```json
    {
        "message": "验证码错误！" //...
    }
    ```




### 用户注册-

- 方法及参数

  | POST /public/register |
  | --------------------- |
  | email - 邮箱          |
  | username - 用户名     |
  | password - 密码       |
  | verification - 验证码 |

- 返回

  - success

    ```json
    {
        "_id": "5ea40eaaa0fc7a5a34b54651",
        "email": "example@email.com",
        "username": "gaolihaiUnm",
        "avatar": "\uploads\upload_e99e365d83afcc99452142989baa9ed1.jpg",
        "role": "student",
        "createTime": "2020-04-25T10:19:22.569Z"
    }
    ```

  - fail

    ```json
    {
        "message": "验证码错误！" //...
    }
    ```



<h3 style="color:red;">搜索题目（废弃）</h3>

- 方法及参数

  | GET /public/search/:key |
  | ----------------------- |
  | 无参数                  |


- 返回

  - success

    ```json
    [
        {
            "meta": {
                "views": 0,
                "likes": 0
            },
            "image": [
                ""
            ],
          "_id": "5ea55fd8f398ae4e24a46b9d",
            "title": "exampleTitle",
          "description": "<h1>example</h1>",
            "md": "# example",
            "category": {
                "_id": "5ea5537f81c79503e8cab26e",
                "title": "exampleTitle",
                "createTime": "2020-04-26T09:25:19.555Z",
                "__v": 0
            },
            "difficulty": {
                "_id": "5ea55566f65e0a3d58b1f17c",
                "title": "exampleTitle",
                "createTime": "2020-04-26T09:33:26.302Z",
                "__v": 0
            },
            "author": {
                "avatar": null,
                "path": null,
                "role": "admin",
                "_id": "5ea1b118e0b50950a8000d5b",
                "email": "1019933576@qq.com",
                "username": "高厉害",
                "__v": 0,
                "createTime": "2020-04-26T13:39:20.176Z"
            },
            "publishDate": "2020-04-26T10:18:00.186Z",
            "__v": 0
        },
        //...
    ]
    ```
  
  - fail
  
    ```json
    {
        "message": error.message //...
    }
    ```

### 获取题目列表-

- 方法及参数

  | GET /public/questions                                |
  | ---------------------------------------------------- |
  | page - 页数                                          |
  | count - 每页数量（<= 30）                            |
  | sort - 排序方式 - 0 : 时间 / 1 : 点赞数 / 2 : 点击量 |
  | categories - 标签分类（数组）（可选）                |
  | difficulties - 难度分类（数组）（可选）              |
  | key - 搜索关键字（可选）                             |

- 返回

  - success

    ```json
    {
        "questions": [
            {
                "meta": {
                    "views": 4,
                    "likes": 0
                },
                "category": [
                    {
                        "_id": "5ea5537f81c79503e8cab26e",
                        "title": "exampleTitle",
                        "createTime": "2020-04-26T09:25:19.555Z",
                        "__v": 0
                    },
            		//...
                ],
                "difficulty": {
                    "_id": "5ea55566f65e0a3d58b1f17c",
                    "title": "exampleTitle",
                    "createTime": "2020-04-26T09:33:26.302Z",
                    "__v": 0
                },
                "_id": "5ea836e8bb44535b7c0a2d6c",
                "title": "exampleTitle",
                "author": {
                    "avatar": null,
                    "path": null,
                    "role": "admin",
                    "_id": "5ea1b118e0b50950a8000d5b",
                    "email": "1019933576@qq.com",
                    "username": "高厉害",
                    "__v": 0,
                    "createTime": "2020-04-28T14:09:43.401Z"
                },
                "publishDate": "2020-04-28T14:00:08.782Z",
                "__v": 0
            },
            //...
        ],
        "pages": [
            "1",
            "2",
            "3",
            "4"
        ],
        "page": "2"
    }
    ```
    
  - fail
      ```json
      {
          "message": error.message //...
      }
      ```
  



### 根据 id 获取题目-

- 方法及参数

  | GET /public/questions |
  | --------------------- |
  | 无参数                |


- 返回

  - success

    ```json
    {
        "question":{
            "meta": {
                "views": 4,
                "likes": 1
            },
            "image": [],
            "category": [
                {
                    "_id": "5ea5537f81c79503e8cab26e",
                    "title": "exampleTitle",
                    "createTime": "2020-04-26T09:25:19.555Z",
                    "__v": 0
                },
                //...
            ],
            "difficulty": {
                "_id": "5ea55566f65e0a3d58b1f17c",
                "title": "exampleTitle",
                "createTime": "2020-04-26T09:33:26.302Z",
                "__v": 0
            },
            "_id": "5ea836e8bb44535b7c0a2d6c",
            "title": "exampleTitle",
            "description": "<h1>example</h1>",
            "md": "# example",
            "author": {
                "avatar": null,
                "path": null,
                "role": "admin",
                "_id": "5ea1b118e0b50950a8000d5b",
                "email": "1019933576@qq.com",
                "username": "高厉害",
                "__v": 0,
                "createTime": "2020-04-28T14:09:43.401Z"
            },
            "publishDate": "2020-04-28T14:00:08.782Z",
            "__v": 0
        },
        "liked":true
    }
    ```
    
  - fail
  
    ```json
    {
        "message": error.message //...
    }
    ```



### 根据题目 id 获取题解列表-

- 方法及参数

  | GET /public/answers                                          |
  | ------------------------------------------------------------ |
  | questionId - 题目 id                                         |
  | page - 页数                                                  |
  | count - 每页数量（<= 30）                                    |
  | sort - 排序方式 - 0 : 时间 / 1 : 点赞数 / 2 : 点击量 / 3 : 评论数 |

- 返回

  - success

    ```json
    {
        "answers": [
            {
                "meta": {
                    "views": 0,
                    "likes": 0,
                    "comments": 0
                },
                "image": [],
                "_id": "5ea586bc8a0d230110b66107",
                "title": "exampleTitle",
                "content": "<h1>exampleContent</h1>",
                "md": "# exampleContent",
                "question": "5ea55f944556ad138817703d",
                "author": {
                    "avatar": null,
                    "path": null,
                    "role": "admin",
                    "_id": "5ea1b118e0b50950a8000d5b",
                    "email": "1019933576@qq.com",
                    "username": "高厉害",
                    "__v": 0,
                    "createTime": "2020-04-26T15:31:06.473Z"
                },
                "publishDate": "2020-04-26T13:03:56.348Z",
                "__v": 0
            },
            //...
        ],
        "pages": [
            "1"
        ],
        "page": "1"
    }
    ```
  
  - fail
  
    ```json
    {
        "message": error.message //...
    }
    ```

### 根据题解 id 获取题解-

- 方法及参数

  | GET /public/questions/:questionId |
  | --------------------------------- |
  | 无参数                            |


- 返回

  - success

    ```json
    {
        "answer":{
            "meta": {
                "views": 36,
                "likes": 2,
                "comments": 3
            },
            "image": [],
            "_id": "5ea586bc8a0d230110b66107",
            "title": "exampleTitle",
            "content": "<h1>exampleContent</h1>",
            "md": "# exampleContent",
            "question": {
                "_id": "5ea55f944556ad138817703d",
                "title": "exampleTitle"
            },
            "author": {
                "avatar": null,
                "path": null,
                "role": "admin",
                "_id": "5ea1b118e0b50950a8000d5b",
                "email": "1019933576@qq.com",
                "username": "高厉害",
                "__v": 0,
                "createTime": "2020-04-28T14:45:01.871Z"
            },
            "publishDate": "2020-04-26T13:03:56.348Z",
            "__v": 0
        },
        "liked":false
    }
    ```
    
  - fail
  
    ```json
    {
        "message": error.message //...
    }
    ```



### 根据题解 id 获取评论列表-

- 方法及参数

  | GET /public/comments      |
  | ------------------------- |
  | answerId - 题目 id        |
  | page - 页数               |
  | count - 每页数量（<= 30） |

- 返回

  - success

    ```json
    {
        "comment": [
            {
                "likes": 0,
                "_id": "5ea56fdecb1be62c6005bad8",
                "content": "exampleContent",
                "answer": "5ea55f944556ad138817703d",
                "author": {
                    "avatar": null,
                    "path": null,
                    "role": "admin",
                    "_id": "5ea1b118e0b50950a8000d5b",
                    "email": "1019933576@qq.com",
                    "username": "高厉害",
                    "__v": 0,
                    "createTime": "2020-04-27T02:00:57.304Z"
                },
                "publishDate": "2020-04-26T11:26:22.548Z",
                "__v": 0
            },
            //.	..
        ],
        "pages": [
            "1"
        ],
        "page": "1"
    }
    ```

  - fail

    ```json
    {
        "message": error.message //...
    }
    ```



### 根据评论 id 获取题解评论-

- 方法及参数

  | GET /public/comments/:answerId |
  | :----------------------------- |
  | 无参数                         |

- 返回

  - success

    ```json
    {
        "_id": "5ea56fdecb1be62c6005bad8",
        "likes": 0,
        "content": "exampleContent",
        "answer": "5ea55f944556ad138817703d",
        "author": {
            "avatar": null,
            "path": null,
            "role": "admin",
            "_id": "5ea1b118e0b50950a8000d5b",
            "email": "1019933576@qq.com",
            "username": "高厉害",
            "__v": 0,
            "createTime": "2020-04-27T02:07:47.360Z"
        },
        "publishDate": "2020-04-26T11:26:22.548Z",
        "__v": 0
    }
    ```

  - fail

    ```json
     {
         "message": error.message //...
     }
    ```



### 获取难度分类列表-

- 方法及参数

  | GET /public/difficulties |
  | ------------------------ |
  | 无参数                   |

- 返回

  - success

    ```json
    [
        {
            "_id": "5ea55522801d7846c081b79e",
            "title": "exampleTitle",
            "createTime": "2020-04-26T09:32:18.685Z",
            "__v": 0
        },
    	//...
    ]
    ```

  - fail

    ```json
     {
         "message": error.message //...
     }
    ```



### 根据 id 获取难度分类-

- 方法及参数

  | GET /public/difficulties/difficultyId |
  | ------------------------------------- |
  | 无参数                                |

- 返回

  - success

    ```json
    {
        "_id": "5ea55566f65e0a3d58b1f17c",
        "title": "exampleTitle",
        "createTime": "2020-04-26T09:33:26.302Z",
        "__v": 0
    }
    ```

  - fail

    ```json
     {
         "message": error.message //...
     }
    ```



### 获取标签分类列表-

- 方法及参数

  | GET /public/categories |
  | ---------------------- |
  | 无参数                 |

- 返回

  - success

    ```json
    [
        {
            "_id": "5ea5525566c2651918648935",
            "title": "exampleTitle",
            "createTime": "2020-04-26T09:20:21.825Z",
            "__v": 0
        },
    	//...
    ]
    ```

  - fail

    ```json
     {
         "message": error.message //...
     }
    ```

    

### 根据 id 获取标签分类-

- 方法及参数

  | GET /public/categories/categoryId |
  | --------------------------------- |
  | 无参数                            |

- 返回

  - success

    ```json
    {
        "_id": "5ea5525566c2651918648935",
        "title": "exampleTitle",
        "createTime": "2020-04-26T09:20:21.825Z",
        "__v": 0
    }
    ```

  - fail

    ```json
     {
         "message": error.message //...
     }
    ```

    

  

## 一般（学生）用户接口

###  图片上传

- 方法及参数

  | POST /userAction/upload |
  | ----------------------- |
  | * - 图片数据            |

- 返回

  - success

    ```json
    {
        "*": "\\uploads\\upload_f9bbf0c2ee96bcd83e427950b9a4d730.jpg",
        //...
    }
    ```
    
    注意，当文件为空时，`key`对应的值为 `""`
  
  - fail
  
    ```json
    {
        "message": error.message
    }
    ```



### 评论题解-

- 方法及参数

  | POST /userAction/comments/:commentId |
  | ------------------------------------ |
  | content - 评论内容                   |

- 返回

  - success

    ```json
    {
        "likes": 0,
        "_id": "5ea586bc8a0d230110b66107",
        "content": "exampleContent",
        "answer": "5ea55f944556ad138817703d",
        "author": "5ea1b118e0b50950a8000d5b",
        "publishDate": "2020-04-26T11:26:22.548Z",
        "__v": 0
    }
    ```

  - fail

    ```json
    {
        "message": error.message
    }
    ```


### 删除评论-

- 方法及参数

  | DELETE /userAction/comments/:commentId |
  | -------------------------------------- |
  | content - 评论内容                     |

- 返回

  - success

    ```json
    {
        "message": "删除成功！"
    }
    ```

  - fail

    ```json
    {
        "message": error.message
    }
    ```



### 发布题解-

- 方法及参数

  | POST /userAction/answers/:questionId |
  | ------------------------------------ |
  | content - 评论内容                   |

- 返回

  - success

    ```json
    {
        "meta": {
            "views": 0,
            "likes": 0,
            "comments": 0
        },
        "image": [],
        "_id": "5ea586bc8a0d230110b66107",
        "title": "exampleTitle",
        "content": "<h1>exampleContent</h1>",
        "md": "# exampleContent",
        "question": "5ea55f944556ad138817703d",
        "author": "5ea1b118e0b50950a8000d5b",
        "publishDate": "2020-04-26T13:03:56.348Z",
        "__v": 0
    }
    ```

  - fail

    ```json
    {
        "message": error.message
    }
    ```

  

### 根据 id 修改题解-

- 方法及参数

  | PUT /userAction/answers/:answerId                            |
  | ------------------------------------------------------------ |
  | title - 标题（可选）                                         |
  | content - html 正文（可选）                                  |
  | md - markdown 正文 （可选）（务必与 content 字段同时提供，该处后端已做了安全处理，仅提供两字段的其中一个则会被服务端拒绝） |
  | image - 文章包含图片文件名 （可选）（数组）                  |

- 返回

  - success

    ```json
    {
        "meta": {
            "views": 38,
            "likes": 2,
            "comments": 3
        },
        "image": [],
        "_id": "5ea586bc8a0d230110b66107",
        "title": "change",
        "content": "<h1>123</h1>",
        "md": "# 123",
        "question": "5ea55f944556ad138817703d",
        "author": "5ea1b118e0b50950a8000d5b",
        "publishDate": "2020-04-26T13:03:56.348Z",
        "__v": 0
    }
    ```

  - fail

    ```json
    {
        "message": error.message
    }
    ```

### 根据 id 删除题解-

- 方法及参数

  | DELETE /userAction/answers/:answerId |
  | ------------------------------------ |
  | 无参数                               |

- 返回

  - success

    ```json
    {
        "message": "删除成功！"
    }
    ```
    
  - fail
  
    ```json
    {
        "message": error.message
    }
    ```



### 题目点赞-

- 方法及参数

  | POST /userAction/likes/questions/:questionId |
  | -------------------------------------------- |
  | 无参数                                       |

- 返回

  - success

    ```json
    {
        "message": "点赞成功！"
    }
    ```

  - fail

    ```json
    {
        "message": "您已经点过赞了！"//...
    }
    ```




### 题目取消点赞-

- 方法及参数

  | DELETE /userAction/likes/questions/:questionId |
  | ---------------------------------------------- |
  | 无参数                                         |

- 返回

  - success

    ```json
    {
        "message": "取消点赞成功！"
    }
    ```

  - fail

    ```json
    {
        "message": "您还未点赞！"//...
    }
    ```



### 题解点赞-

- 方法及参数

  | POST /userAction/likes/answers/:answerId |
  | ---------------------------------------- |
  | 无参数                                   |

- 返回

  - success

    ```json
    {
        "message": "点赞成功！"
    }
    ```

  - fail

    ```json
    {
        "message": "您已经点过赞了！"//...
    }
    ```




### 题解取消点赞-

- 方法及参数

  | DELETE /userAction/likes/answers/:answerId |
  | ------------------------------------------ |
  | 无参数                                     |

- 返回

  - success

    ```json
    {
        "message": "取消点赞成功！"
    }
    ```

  - fail

    ```json
    {
        "message": "您还未点赞！"//...
    }
    ```




### 获取当前用户信息（jsonp）-

- 方法及参数

  | GET /public/usersJsonp |
  | ---------------------- |
  | 无参数                 |

- 返回

  - success

    已登录：

    ```js
    window.user = {
        _id : '${user._id}',
        email : '${user.email}',
        username : '${user.username}',
        avatar : '${user.avatar}',
        role : '${user.role}',
    };
    window.isLogin = true;
    ```

    未登录：

    ```js
    window.isLogin = false;
    ```

    

  - fail

    ```json
    window.userError = ${error.message};
    ```

  

### 根据 id 获取用户信息-

- 方法及参数

  | GET /userAction/users/:userId |
  | ----------------------------- |
  | 无参数                        |

- 返回

  - success

    ```js
    {
        "_id": "5ea1b118e0b50950a8000d5b",
        "email": "1019933576@qq.com",
        "username": "高厉害",
        "avatar": null,
        "role": "admin",
        "createTime": "2020-04-29T05:04:21.616Z"
    }
    ```

  - fail

    ```json
    {
        "message": error.message
    }
    ```




### 获取当前用户信息-

- 方法及参数

  | GET /userAction/users |
  | --------------------- |
  | 无参数                |

- 返回

  - success

    ```js
    {
        "_id": "5ea1b118e0b50950a8000d5b",
        "email": "1019933576@qq.com",
        "username": "高厉害",
        "avatar": null,
        "role": "admin",
        "createTime": "2020-04-29T05:04:21.616Z"
    }
    ```

  - fail

    ```json
    {
        "message": error.message
    }
    ```



### 修改当前用户信息-

- 方法及参数

  | PUT /userAction/users                                        |
  | ------------------------------------------------------------ |
  | avatar - 头像（可选）                                        |
  | oldPwd - 旧密码（可选）                                      |
  | newPwd - 新密码（可选）（若仅上传一个 oldPwd 和 newPwd 其中一个，则会返回 400 状态吗） |

- 返回

  - success

    ```js
    {
        "message": "修改成功！"
        // 备注：即便未发生修改行为，只要没有出现错误，就会返回该信息
    }
    ```

  - fail

    ```json
    {
        "message": error.message
    }
    ```



## 教师用户接口

### 发布题目-

- 方法及参数

  | POST /teacher/answer                          |
  | --------------------------------------------- |
  | title - 题目标题                              |
  | description - 题目描述（html 格式）           |
  | md - 题目描述（markdown 格式）                |
  | image - 包含的图片文件名                      |
  | category - 标签分类 _id（多个分类用 - 隔开）  |
  | difficulty - 难度分类 _id（难度分类仅有一个） |

- 返回

  - success

    ```json
    {
        "meta": {
            "views": 0,
            "likes": 0
        },
        "image": [],
        "category": [
            {
                "_id": "5ea5537f81c79503e8cab26e",
                "title": "exampleTitle",
                "createTime": "2020-04-26T09:25:19.555Z",
                "__v": 0
            },
    		//...
        ],
        "_id": "5ea83db8b04d044eb890f993",
        "title": "exampleTitle",
        "description": "<h1>example</h1>",
        "md": "# example",
        "difficulty": {
            "_id": "5ea55566f65e0a3d58b1f17c",
            "title": "exampleTitle",
            "createTime": "2020-04-26T09:33:26.302Z",
            "__v": 0
        },
        "author": "5ea1b118e0b50950a8000d5b",
        "publishDate": "2020-04-28T14:29:12.720Z",
        "__v": 0
    }
    ```

  - fail

    ```json
    {
        "message": error.message
    }
    ```




### 修改题目-

- 方法及参数

  | PUT /teacher/answer                                          |
  | ------------------------------------------------------------ |
  | title - 题目标题（可选）                                     |
  | description - 题目描述（html 格式）（可选）                  |
  | md - 题目描述（markdown 格式）（可选）（务必与 description 一起提交，否则会拦截请求） |
  | image - 包含的图片文件名（可选）                             |
  | category - 标签分类 _id（多个分类用 - 隔开）（可许县）       |
  | difficulty - 难度分类 _id（难度分类仅有一个）（可选）        |

- 返回

  - success

    ```json
    {
        "meta": {
            "views": 9,
            "likes": 1
        },
        "image": [],
        "category": [
            {
                "_id": "5ea5537f81c79503e8cab26e",
                "title": "exampleTitle",
                "createTime": "2020-04-26T09:25:19.555Z",
                "__v": 0
            },
            //...
        ],
        "_id": "5ea55f944556ad138817703d",
        "title": "exampleTitle",
        "description": "<h1>example</h1>",
        "md": "# example",
        "difficulty": {
            "_id": "5ea55566f65e0a3d58b1f17c",
            "title": "exampleTitle",
            "createTime": "2020-04-26T09:33:26.302Z",
            "__v": 0
        },
        "author": "5ea1b118e0b50950a8000d5b",
        "publishDate": "2020-04-26T10:16:52.164Z",
        "__v": 0
    }
    ```

  - fail

    ```json
    {
        "message": error.message
    }
    ```

  

### 删除题目-

- 方法及参数

  | DELETEE /teacher/answer/:answerId |
  | --------------------------------- |
  | 无参数                            |

- 返回

  - success
  
    ```json
    {
        "message": "删除成功"
    }
    ```
  
  - fail
  
    ```json
    {
        "message": error.message
    }
    ```
  



### 添加标签分类-

- 方法及参数

  | POST /teacher/categories           |
  | ---------------------------------- |
  | title - 分类标题 - 1 ~ 20 字符之间 |

- 返回

  - success

    ```json
    {
        "_id": "5ea5537f81c79503e8cab26e",
        "title": "exampleTitle",
        "createTime": "2020-04-26T09:25:19.555Z",
        "__v": 0
    }
    ```

  - fail

    ```json
    {
        "message": error.message
    }
    ```

### 根据 id 修改标签分类-

- 方法及参数

  | PUT /teacher/categories/:\_id      |
  | ---------------------------------- |
  | title - 分类标题 - 1 ~ 20 字符之间 |

- 返回

  - success

    ```json
    {
        "_id": "5ea5529266c2651918648936",
        "title": "changed",
        "createTime": "2020-04-26T09:21:22.615Z",
        "__v": 0
    }
    ```

  - fail

    ```json
    {
        "message": error.message
    }
    ```




### 添加难度分类-

- 方法及参数

  | POST /teacher/difficulties         |
  | ---------------------------------- |
  | title - 分类标题 - 1 ~ 20 字符之间 |

- 返回

  - success

    ```json
    {
        "_id": "5ea55566f65e0a3d58b1f17c",
        "title": "exampleTitle",
        "createTime": "2020-04-26T09:33:26.302Z",
        "__v": 0
    }
    ```

  - fail

    ```json
    {
        "message": error.message
    }
    ```




### 根据 id 修改难度分类-

- 方法及参数

  | PUT /teacher/difficulties/:\_id    |
  | ---------------------------------- |
  | title - 分类标题 - 1 ~ 20 字符之间 |

- 返回

  - success

    ```json
    {
        "_id": "5ea55522801d7846c081b79e",
        "title": "changed",
        "createTime": "2020-04-26T09:32:18.685Z",
        "__v": 0
    }
    ```

  - fail

    ```json
    {
        "message": error.message
    }
    ```



## 管理员用户接口

### 获取用户列表-

- 方法及参数

  | GET /admin/users                                             |
  | ------------------------------------------------------------ |
  | page - 页数                                                  |
  | count - 每页条数（<= 30）                                    |
  | role - 角色筛选（ 允许通过验证的值 : ['admin', 'teacher', 'student'] ） |

- 返回

  - success

    ```json
    {
        "users": [
            {
                "avatar": "\\upload_a65ce214e60adbe045fa5e3cc4c737bf.jpg",
                "role": "admin",
                "_id": "5ea918dfbc35c10e601902ef",
                "email": "example@em1ail.com",
              "username": "gaoli1haiUnm",
                "createTime": "2020-04-29T06:04:15.629Z",
              "__v": 0
            },
            // ...
        ],
        "pages": [
            "1"
        ],
        "page": "1",
        "tailPage": 1,
        "total": 3
    }
    ```
  
  - fail
  
    ```json
    {
        "message": error.message
    }
    ```



### 直接添加用户-

- 方法及参数

  | POST /admin/users                                            |
  | ------------------------------------------------------------ |
  | email - 邮箱                                                 |
  | password - 密码                                              |
  | username - 用户名                                            |
  | role - 角色（可选，默认为 'student'）（ 允许通过验证的值 : ['admin', 'teacher', 'student'] ） |
  | avatar - 头像（可选）                                        |

- 返回

  - success

    ```json
    {
        "users": [
            {
                "avatar": "\\upload_a65ce214e60adbe045fa5e3cc4c737bf.jpg",
                "role": "admin",
                "_id": "5ea918dfbc35c10e601902ef",
                "email": "example@em1ail.com",
                "username": "Unm",
                "createTime": "2020-04-29T06:04:15.629Z",
                "__v": 0
            },
            // ...
        ],
        "pages": [
            "1"
        ],
        "page": "1",
        "tailPage": 1,
        "total": 3
    }
    ```

  - fail

    ```json
    {
        "message": error.message
    }
    ```



### 根据 id 修改用户-

- 方法及参数

  | PUT /admin/users                                             |
  | ------------------------------------------------------------ |
  | email - 邮箱 （可选）                                        |
  | password - 密码 （可选）                                     |
  | username - 用户名 （可选）                                   |
  | role - 角色（可选，默认为 'student'）（ 允许通过验证的值 : ['admin', 'teacher', 'student'] ） |
  | avatar - 头像（可选）                                        |

- 返回

  - success

    ```json
    {
        "avatar": "\\upload_a65ce214e60adbe045fa5e3cc4c737bf.jpg",
        "path": null,
        "role": "admin",
        "_id": "5ea918dfbc35c10e601902ef",
        "email": "example@em1ail.com",
        "username": "Unm",
        "createTime": "2020-04-29T06:04:15.629Z",
        "__v": 0
    }
    ```

  - fail

    ```json
    {
        "message": error.message
    }
    ```



### 根据 id 删除标签分类-

- 方法及参数

  | DELETE /admin/categories/:categoryId |
  | ------------------------------------ |
  | 无参数                |

- 返回

  - success

    ```json
    {
        "message": "删除成功"
    }
    ```
    
  - fail
  
    ```json
    {
        "message": error.message
    }
    ```



### 根据 id 删除难度分类-

- 方法及参数

  | DELETE /admin/difficulties/difficultyId |
  | --------------------------------------- |
  | 无参数                                  |

- 返回

  - success

    ```json
    {
        "message": "删除成功"
    }
    ```
    
  - fail
  
    ```json
    {
        "message": error.message
    }
    ```



### 根据 id 删除评论

- 方法及参数

  | DELETE /admin/comments/commentId |
  | -------------------------------- |
  | 无参数                           |

- 返回

  - success

    ```json
    {
        "message": "删除成功"
    }
    ```

  - fail

    ```json
    {
        "message": error.message
    }
    ```



