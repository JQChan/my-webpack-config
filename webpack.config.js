var webpack = require('webpack');
var path = require('path');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var isProduction = process.env.NODE_ENV === 'production';  //在命令窗口执行命令set node_env=production ,不执行的话则为false
// console.log(isProduction);

var publicPath = isProduction ? 'https://portal.qiniu.com/bucket/image/' : '../../';  //产品环境下采用七牛云服务器 , 生产环境下采用本地图片

module.exports = {
  //devtool: 'source-map',//会添加source-map文件，默认关闭devtool： false
  context: __dirname, //基本路径（绝对路径）
  entry: {  //页面原生ReactJS文件配置（未经Webpack打包）
    // 'resume/resumeBase': '../../resources/js/resume/resume-base.js',
    // 'position/positionList': '../../resources/js/position/position-list.js',
    // 'resume/resume-favorite': '../../resources/js/resume/resume-favorite.js',
    // 'resume/resume-folder': '../../resources/js/resume/resume-folder.js',
    // 'position/positionView': '../../resources/js/position/position-view.js',
    //css打包
    'agent/agent-common':'../../resources/src/css/agent/agent-common.css',
    'agent/release-resume':'../../resources/src/css/agent/release-resume.css',
    'index/index':'../../resources/src/css/index/index.css',
    'index/reset':'../../resources/src/css/index/reset.css',
    'college/college':'../../resources/src/css/college/college.css',
    'position/index':'../../resources/src/css/position/index.css',
    'security-center/security-center':'../../resources/src/css/security-center/security-center.css',
    'resume/admin':'../../resources/src/css/resume/admin.css',
    'resume/condition':'../../resources/src/css/resume/condition.css',
    'resume/employer-menu':'../../resources/src/css/resume/employer-menu.css',
    'resume/footer':'../../resources/src/css/resume/footer.css',
    'resume/header':'../../resources/src/css/resume/header.css',
    'resume/index':'../../resources/src/css/resume/index.css',
    'resume/modal':'../../resources/src/css/resume/modal.css',
    'resume/resume-search':'../../resources/src/css/resume/resume-search.css',
    'resume/select':'../../resources/src/css/resume/select.css',
    'resume/table':'../../resources/src/css/resume/table.css',
    'resume/upload-resume':'../../resources/src/css/resume/upload-resume.css',
    
    //后台菜单栏公用代码
    'home/home-menu':'../../resources/src/js/home/menu.js',
    'position/position-published-list': '../../resources/src/js/position/position-published-list.js',
    'position/position-unpublished-list': '../../resources/src/js/position/position-unpublished-list.js',
    'resume/resume-upload': '../../resources/src/js/resume/resume-upload.js',
    'resume/resume-base': '../../resources/src/js/resume/resume-base.js',
    'resume/resume-folder': '../../resources/src/js/resume/resume-folder.js',
    'resume/resume-edit': '../../resources/src/js/resume/resume-edit.js',
    'resume/resume-view': '../../resources/src/js/resume/resume-view.js',
    //人才
    'talent/talent-home':'../../resources/src/js/talent/talent-home.js',
    //职位
    'position/position-edit': '../../resources/src/js/position/position-edit.jsx', //职位编辑
    'position/position-create': '../../resources/src/js/position/position-create.jsx', //发布职位
    'position/position-view': '../../resources/src/js/position/position-view.jsx', //职位展示
    'position/position-preview': '../../resources/src/js/position/position-preview.jsx', //职位预览

    //company
    'company/interview':'../../resources/src/js/company/interview.jsx', //发送面试邮件

    //经纪账户
    'agent/agent-home':'../../resources/src/js/agent/agent-home.js',
    'agent/agent-account': '../../resources/src/js/agent/agent-account.jsx', //我的账户
    'agent/register-info': '../../resources/src/js/agent/register-info.jsx', //注册信息
    'agent/position-collect': '../../resources/src/js/agent/agent-position-collect.jsx', //职位收藏
    'agent/agent-resume-published': '../../resources/src/js/agent/agent-resume-published.jsx' ,//已发布简历

    //登录相关
    "login/login":'../../resources/src/js/login/login.js',
    "login/register":'../../resources/src/js/login/register.js',
    "login/forget":'../../resources/src/js/login/forget.js',
    'company/company-register':'../../resources/src/js/company/company-register.js',
    'company/company-card':'../../resources/src/js/company/company-card.js'
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
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css-loader')
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
    // isProduction ? new UglifyJsPlugin({  //压缩打包的文件(建议开发环境下不开启)
    //   compress: {
    //     warnings: false
    //   },
    //   minimize: true,
    //   comments: false,
    //   sourceMap: false,
    // }) : {}
  ],
  resolve: {
    fallback: path.join(__dirname, 'node_modules')
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  }
};
