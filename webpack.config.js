var webpack = require('webpack');
var path = require('path');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var isProduction = process.env.NODE_ENV === 'production';  //在命令窗口执行命令set node_env=production ,不执行的话则为false
// console.log(isProduction);

var publicPath = isProduction ? 'http://static.rencaijia.com/img/' : '/resources/build/';  //产品环境下采用腾讯云服务器 , 生产环境下采用本地图片

module.exports = {
  //devtool: 'source-map',//会添加source-map文件，默认关闭devtool： false
  context: __dirname, //基本路径（绝对路径）
  entry: {  //页面原生ReactJS文件配置（未经Webpack打包）
    //首页js
    'index/index-position-list': '../../resources/src/js/index/index-position-list.js',
    //css打包
    'agent/agent-common': '../../resources/src/css/agent/agent-common.css',
    'agent/release-resume': '../../resources/src/css/agent/release-resume.css',
    'index/reset': '../../resources/src/css/index/reset.css',
    'college/college': '../../resources/src/css/college/college.css',
    'position/index': '../../resources/src/css/position/index.css',
    //'security-center/security-center': '../../resources/src/css/security-center/security-center.css',
    
    'resume/admin': '../../resources/src/css/resume/admin.css',
    'resume/condition': '../../resources/src/css/resume/condition.css',
    'resume/employer-menu': '../../resources/src/css/resume/employer-menu.css',
    'resume/footer': '../../resources/src/css/resume/footer.css',
    'resume/header': '../../resources/src/css/resume/header.css',
    'resume/index': '../../resources/src/css/resume/index.css',
    'resume/modal': '../../resources/src/css/resume/modal.css',
    'resume/select': '../../resources/src/css/resume/select.css',
    'resume/table': '../../resources/src/css/resume/table.css',
    'resume/upload-resume': '../../resources/src/css/resume/upload-resume.css',

    //后台菜单栏公用代码
    //'home/home-menu': '../../resources/src/js/home/menu.js',
    'position/position-published-list': '../../resources/src/js/position/position-published-list.js',
    'position/position-unpublished-list': '../../resources/src/js/position/position-unpublished-list.js',
    'resume/resume-upload': '../../resources/src/js/resume/resume-upload.jsx',
    //'resume/resume-upload': '../../resources/src/js/resume/resume-upload.js',
    'resume/resume-base': '../../resources/src/js/resume/resume-base.jsx',
    'resume/resume-folder': '../../resources/src/js/resume/resume-folder.js',
    'resume/resume-edit': '../../resources/src/js/resume/resume-edit.js',
    'resume/resume-view': '../../resources/src/js/resume/resume-view.js',
    'resume/resume-market-list': '../../resources/src/js/resume/resume-market-list.jsx', //简历市场
    'resume/resume-favorite': '../../resources/src/js/resume/resume-favorite.jsx', //简历收藏
    'resume/resume-all-list': '../../resources/src/js/resume/resume-all-list.jsx', //全部简历
    'resume/intelligent-recommend': '../../resources/src/js/resume/intelligent-recommend.js', //智能推荐
    'resume/resume-search': '../../resources/src/js/resume/resume-search.js',//经纪搜索简历
    'resume/resume-search-list': '../../resources/src/js/resume/resume-search-list.jsx', //经纪邀约搜索结果

    //雇主
    'hirer/hirer-home': '../../resources/src/js/hirer/hirer-home.jsx',
    'hirer/resume-search': '../../resources/src/js/hirer/resume-search.js',//雇主搜索简历
    'hirer/resume-search-list': '../../resources/src/js/hirer/resume-search-list.js', //雇主搜索结果

    //人才
    'talent/talent-home': '../../resources/src/js/talent/talent-home.js',
    'talent/job-progress-list': '../../resources/src/js/talent/job-progress-list.js', //求职进展待处理
    'talent/job-progress-record': '../../resources/src/js/talent/job-progress-record.js', //求职记录
    'talent/talent-position-list': '../../resources/src/js/talent/talent-position-list.js',//人才首页职位推荐
    'talent/talent-home-right': '../../resources/src/js/talent/talent-home-right.js',//人才首页左边个人信息
    'talent/talent-account': '../../resources/src/js/talent/talent-account.js',//人才个人账户
    //职位
    'position/position-edit': '../../resources/src/js/position/position-edit.jsx', //职位编辑
    'position/position-create': '../../resources/src/js/position/position-create.jsx', //发布职位
    'position/position-view': '../../resources/src/js/position/position-view.jsx', //职位展示
    'position/position-preview': '../../resources/src/js/position/position-preview.jsx', //职位预览
    'position/position-list': '../../resources/src/js/position/position-list.jsx', //职位列表
    'position/position-market': '../../resources/src/js/position/position-market.jsx',//职位市场
    'position/position-search': '../../resources/src/js/position/position-search.jsx',//职位搜索
    'position/position-search-result': '../../resources/src/js/position/position-search-result.jsx',//职位搜索结果
    'position/position-favorite-list': '../../resources/src/js/position/position-favorite-list.jsx',//职位收藏
    'position/position-recommend': '../../resources/src/js/position/position-recommend.js', //职位推荐

    //company
    'company/interview': '../../resources/src/js/company/interview.jsx', //发送面试邮件

    //经纪账户
    //'agent/agent-home':'../../resources/src/js/agent/agent-home.js',
    'agent/agent-home': '../../resources/src/js/agent/agent-home.jsx',
    'agent/agent-account': '../../resources/src/js/agent/agent-account.js', //我的账户
    'agent/register-info': '../../resources/src/js/agent/register-info.jsx', //注册信息
    'agent/position-collect': '../../resources/src/js/agent/agent-position-collect.jsx', //职位收藏
    'agent/agent-resume-published': '../../resources/src/js/agent/agent-resume-published.jsx',//已发布简历
    'agent/agent-resume-manage': '../../resources/src/js/agent/agent-resume-manage.jsx',//经纪简历管理
    'agent/agent-resume-obtain': '../../resources/src/js/agent/agent-resume-obtain.jsx',//经纪简历获取
    'agent/follow-up-employer' : '../../resources/src/js/agent/follow-up-employer.js',//内部经纪客户跟踪列表

    //登录相关
    'login/login': '../../resources/src/js/login/login.js',
    'login/register': '../../resources/src/js/login/register.js',
    'login/forget': '../../resources/src/js/login/forget.js',
    'company/company-register': '../../resources/src/js/company/company-register.js',
    'company/company-card': '../../resources/src/js/company/company-card.js',
    'company/company-show': '../../resources/src/js/company/company-show.js',
    'company/company-preview': '../../resources/src/js/company/company-preview.js',

    //"login/register-complete":'../../resources/src/js/login/registerComplete.jsx',

    //面试相关
    'interview/interview-invitation': '../../resources/src/js/interview/interview-invitation.jsx',
    'interview/interview-arrange-list': '../../resources/src/js/interview/interview-arrange-list.js',
    'interview/interview-custom-notification': '../../resources/src/js/interview/interview-custom-notification.js',
    'interview/interview-preview-invitation': '../../resources/src/js/interview/interview-preview-invitation.js',
    //交易记录
    'record/transaction-record': '../../resources/src/js/record/transaction-record.js',

    // 安全中心
    'security-center/modify-password': '../../resources/src/js/security-center/modify-password.jsx',
    'security-center/modify-email': '../../resources/src/js/security-center/modify-email.jsx', //修改邮箱
    'security-center/modify-phone': '../../resources/src/js/security-center/modify-phone.jsx', // 修改手机
    'security-center/binder-email': '../../resources/src/js/security-center/binder-email.jsx', // 绑定邮箱

    //简历创建改版
    'resume/resume-new-edit': '../../resources/src/js/resume/resume-edit/index.js',

    'message/message-list': '../../resources/src/js/message/message-list.jsx'
  },
  // externals: {//不将React\ReactDOM打包到文件里面（暂时不需要此项）
  //   'react': 'React',
  //   'react-dom': 'ReactDOM',
  //   'react-router': 'Router'
  // },
  output: {  //页面打包的JS文件输出配置（通过Webpack打包）
    //path: __dirname , //输出路径（__dirname默认为未打包的文件所在的位置）
    //path: path.join(__dirname,"dist"),//在webpack.config.js路径下新建一个dist文件夹
    path: path.resolve(__dirname, '../../resources/build/'),//输出文件夹
    publicPath: publicPath,
    filename: 'js/[name].bundle.js' //输出文件名（name对应entry中的name）
  },
  module: {
    loaders: [ //加载器配置
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: [
            require.resolve('babel-preset-es2015'),
            require.resolve('babel-preset-react'),
            require.resolve('babel-preset-stage-2')
          ]
        }
      },
      {
        test: /\.less/,
        loader: 'style-loader!css-loader!less-loader'
      },
      // {
      //   test: /\.css$/,
      //   loader: ExtractTextPlugin.extract('css-loader')
      // },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          ExtractTextPlugin.extract('css-loader?importLoaders=1'),
          'postcss-loader'
        ]
      },

      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader?limit=1&name=img/[name].[ext]'//limit参数配置信息的参数“?limit=8192”表示将所有小于8kb的图片都转为base64形式（其实应该说超过8kb的才使用 url-loader 来映射到文件，否则转为data url形式）。
        //loader: 'url-loader?limit=1&name=img/[folder]/[name].[ext]'//limit参数配置信息的参数“?limit=8192”表示将所有小于8kb的图片都转为base64形式（其实应该说超过8kb的才使用 url-loader 来映射到文件，否则转为data url形式）。
      },

      // {
      //   test: /\.(jpe?g|png|gif|svg)(\?v=\d+\.\d+\.\d+)?$/i,
      //   exclude: /node_modules/,
      //   loader: 'file',
      //   query: {
      //     regExp: '\\b(assets.+)',
      //     name: '[0]?[hash:10]',
      //   },
      // },

      // {
      //   test: /\.(png|jpe?g|gif|svg)$/,
      //   loader: 'file',
      //   query: {
      //     name: 'img/[0]', // [N] is the grouping "N" of the match.
      //     regExp: '\\b(images.+)' //this has to be string surprisingly
      //   }
      // }


      // {
      //   test: /\.jsx?$/,         // Match both .js and .jsx files
      //   exclude: /node_modules/,
      //   loader: "babel",
      //   query:
      //   {
      //     presets:['react','es2015']
      //   }
      // },
      // {
      //   test: /\.(css)$/,
      //   loader: 'style-loader!css-loader'
      // },
      // {
      //   test: /\.(png|jpe?g|eot|svg|ttf|woff2?)$/,
      //   loader: "file?name=images/[name].[ext]"
      // },
    ]
  },
  postcss: () => {
    return [
      // require('postcss-smart-import')({ /* ...options */ }),
      // require('precss')({ /* ...options */ }),
      require('autoprefixer')({
        /* ...options */
        browsers: [
          'ie >= 8',
          'Chrome >= 20',
          'Firefox >= 20'
        ]
      })
    ];
  },
  plugins: [  //插件项配置
    new ExtractTextPlugin('css/[name].css', {allChunks: false}), //已打包输出的css文件 name为entry的name
    new CommonsChunkPlugin({//提取公共的块，即页面js共同的require()引用的文件
      name: 'common',
      filename: 'js/[name].js', //公共模块文件名，若使用了[name]参数，则此name为common，也可以指定其他命名 ,若没有此选项则默认使用上面的output中的filename
      // children: true,  //暂时不知功能      
      minChunks: 2,  //公共的块必须在3个以上entry中使用,默认值为2
      // chunks: [ 'resume/resume-upload', 'resume/resume-folder']  //只提取上面entry中的upload和folder中的公共模块，若没有此选项则默认全部entry
    }),
    // new CopyWebpackPlugin([{
    //    from: path.resolve(__dirname, '../../resources/src/images'),
    //    top:path.resolve(__dirname, '../../resources/build/test/'),
    //    toType:'dir'
    // }]),
    // new UglifyJsPlugin({  //压缩打包的文件(建议开发环境下不开启)
    //   compress: {
    //     warnings: false
    //   },
    //   minimize: true,
    //   comments: false,
    //   sourceMap: false
    // })
  ],
  resolve: {
    fallback: path.join(__dirname, 'node_modules')
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  }
};
