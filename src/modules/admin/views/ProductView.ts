import { getProductById } from '@/modules/products/actions';
import { useQuery } from '@tanstack/vue-query';
import { defineComponent, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import CustomInput from '@/modules/common/components/CustomInput.vue';
import CustomTextArea from '@/modules/common/components/CustomTextArea.vue';


const validationSchema = yup.object({
  title: yup.string().required().min(3),
  slug: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  stock: yup.number().required().min(1),
  gender: yup.string().required().oneOf(['men', 'female', 'kid']),


});





export default defineComponent({

  components: {
    CustomInput,
    CustomTextArea,
  },

  props: {
    productId: {
      type: String,
      required: true,
    },
  },
  setup(props) {

    const router = useRouter();

    const { data: product, isError, isLoading} = useQuery( {
      queryKey: ['product', props.productId],
      queryFn: ()=>
        getProductById(props.productId),
      retry: false,
    });

    const { values, defineField, errors, handleSubmit } = useForm({
      validationSchema,
    });

    const onSubtmit = handleSubmit((values) => {
      console.log({values});

    })

    const [title, titleAttrs] = defineField('title');
    const [slug, slugAttrs] = defineField('slug');
    const [description, descriptionAttrs] = defineField('description');
    const [price, priceAttrs] = defineField('price');
    const [stock, stockAttrs] = defineField('stock');
    const [gender, genderAttrs] = defineField('gender');


    watchEffect(() => {
      if( isError.value && !isLoading.value){
        router.replace('/admin/products');
      }
    })

    return {
      //PROPERTIES
      values,
      errors,

      title,
      titleAttrs,
      slug,
      slugAttrs,
      description,
      descriptionAttrs,
      price,
      priceAttrs,
      stock,
      stockAttrs,
      gender,
      genderAttrs,


      //GETTERS OR METHODS
      allSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],

      //ACTIONS
      onSubtmit,
    };
  },
});
