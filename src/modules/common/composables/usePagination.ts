import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

export const UsePagination = () => {
  const route = useRoute();
  const page = ref(Number(route.query.page || 1));

  //Is utilized to change the page when the user click the next button
  watch(
    () => route.query.page,
    (newPage) => {
      page.value = Number(newPage);

      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  );
  return {
    page,
  };
};
