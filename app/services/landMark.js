import request from '../utils/request'

// 获取地标字典
export function getLandMarkType() {
    return request('/v0.1/dictionaries/landmark')
}

// 获取地标信息
export function getLandMarkPOI(data) {
    return request(`/v0.1/landmarks/pageable?page=${data.page}&&size=${data.size}&&landmark_type=${data.landmarkType}&&landmark_name=${data.landmarkName}`)
}

// 获取线路名称列表
export function getRouteNameList() {
    return request('/v0.1/tour_routes/names')
}

// 获得路线详情信息
export function getRouteInfoById(tourRouteId) {
    return request(`/v0.1/tour_routes/${tourRouteId}`)
}

// 获取最短的导航路线
export function getShortRoute(data) {
    return request(`/v0.1/gdp_edeges/shortRoutes?longitude=${data.longitude}&&latitude=${data.latitude}&&landmark_id=${data.landmarkId}`)
}
