Page({
  data: {
    newsId: '',
    newsTitle:'',
    newsSource:'',
    newsDate:'',
    readCount:0,
    newsContents:[]
  },
  onLoad: function (options) {
    this.setData({
      newsId: options.id
    })
    this.getNewsDetail();
  },
  getNewsDetail(){
    let that = this;
    console.log(that);
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        id: that.data.newsId
      },
      success: res => {
        console.log(res.data.result)
        this.setData({
          newsTitle: res.data.result.title,
          newsSource: res.data.result.source,
          newsDate: res.data.result.date.substr(11, 5),
          readCount: res.data.result.readCount,
          newsContents: res.data.result.content
        })
      }
    })
  }
})