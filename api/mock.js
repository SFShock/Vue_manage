import Mock from 'mockjs'
import homeApi from './mockServeData/home'

Mock.mock('/home/getData','get',homeApi.getStatisticalData)