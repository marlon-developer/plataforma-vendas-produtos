import request from '@/utils/request'

export function all(query) {
  return request({
    url: 'admin/images',
    method: 'get',
    params: query
  })
}

export function upload(payload) {
  return request({
    url: 'admin/images',
    method: 'post',
    data: payload,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function update(image) {
  return request({
    url: `admin/images/${image.id}`,
    method: 'put',
    data: image
  })
}

export function destroy(image_id) {
  return request({
    url: `admin/images/${image_id}`,
    method: 'delete'
  })
}
