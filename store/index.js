export const actions = {
  async nuxtServerInit({ commit }, {req, app}) {
    // 获取地理位置信息
    const {
      status: status1,
      data: {
        province,
        city
      }
    } = await app.$axios.get('/geo/getPosition');

    commit(
      'geo/setPosition',
      status1 === 200
              ? { city, province }
              : { city: '', province: '' }
    );

    // 获取栏目导航
    const {
      status: status2,
      data: {
        menu
      }
    } = await app.$axios.get('/geo/menu');

    commit(
      'home/setMenu',
      status2 === 200 ? menu : []
    );

    const {
      status: status3,
      data: {
        result
      }
    } = await app.$axios.get('/search/hotPlace', {
      params: {
        city: app.store.state.geo.position.city.replace('市', '')
      }
    });

    commit(
      'home/setHotPlace',
      status3 === 200 ? result : []
    );
  }
}
