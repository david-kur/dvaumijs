import request from '../../../utils/request';
import { PAGE_SIZE } from '../../../Constants';

export function fetch({ page = 1 }) {
  return request(`/api/customers/list?page=${page}&limit=${PAGE_SIZE}`);
}

export function remove(id) {
  return request(`/api/customers/${id}`, {
    method: 'DELETE',
  });
}

export function update(id, values) {
  return request(`/api/customers/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });
}

export function create(values) {
  return request('/api/customers/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });
}
