const app = getApp()

const newsInfo = [
  { type: '国内' },
  { type: '国际' },
  { type: '财经' },
  { type: '娱乐' },
  { type: '军事' },
  { type: '体育' },
  { type: '其他' }
]
const newsTypeMap={
  '国内':'gn',
  '国际':'gj',
  '财经':'cj',
  '娱乐':'yl',
  '军事':'js',
  '体育':'ty',
  '其他':'other'
}
Page({
  data: {
    newsInfo: newsInfo,
    hotNewsBackground:'',
    hotNewsTitle:'',
    hotNewsSource:'',
    hotNewsDate:'',
    hotNewsId:'',
    newsList:[],
    tapNewsType:''
  },
  onLoad: function () {
    this.onTapNewsItem(null,'国内');
  },
  onTapNewsItem(event,type){
    let newsType = type||event.currentTarget.dataset.item;
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        type: newsTypeMap[newsType]
      },
      success: res => {
        this.setData({
          hotNewsBackground: res.data.result[0].firstImage,
          hotNewsTitle: res.data.result[0].title,
          hotNewsSource: res.data.result[0].source,
          hotNewsDate: res.data.result[0].date.substr(11, 5),
          hotNewsId: res.data.result[0].id,
          newsList: res.data.result.splice(1),
          tapNewsType: newsType
        })
      }
    })
  },
  onTapNewsItem2Detail(event){
    let newsId = event.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + newsId,
    })
  }
})