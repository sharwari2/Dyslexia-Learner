const API = (path, opts={}) => fetch(`${process.env.REACT_APP_BACKEND || 'http://localhost:5000'}${path}`, opts)
  .then(async res => {
    const data = await res.json().catch(()=>null);
    if(!res.ok) throw data || { message: 'Network error' };
    return data;
  });
export default API;
