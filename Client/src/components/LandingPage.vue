<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import imgUrl from '../assets/education.jpg'
</script>

<template>
  <v-locale-provider rtl>

    <div class="d-flex flex-column">
      <div class="mx-auto">
        <img :src="imgUrl" alt="Logo" style="border-radius: 20px;">
      </div>
      <div style=" margin: auto; width: 820px; background-color: #f2f2f2; padding: 20px; border-radius: 10px;">
        <h3 style="color: #3366cc;">رؤيتنا:</h3>
        <p style="color: #666666;">تهدف منصة الامتحانات الإلكترونية إلى تحويل عملية التقييم والامتحانات إلى تجربة رائدة
          ومبتكرة في العصر الرقمي. نرى مستقبلًا حيث لا يكون هناك حاجة للورق والقلم والتصحيح اليدوي، حيث تتم جميع
          العمليات بشكل آلي وفعال. نحن نسعى لأن نكون الخيار الأول للمؤسسات التعليمية عندما يتعلق الأمر بالامتحانات
          الإلكترونية، ونسعى لتحقيق الابتكار المستدام والتطور المستمر لتلبية احتياجات المستخدمين وتطلعاتهم. ستكون المنصة
          الإلكترونية للامتحانات أداة قوية لتحقيق التكافؤ وتعزيز العدالة التعليمية.
        </p>
        <br>
        <!-- <h3 style="color: #3366cc;">أهدافنا:</h3> <ol style="color: #666666;"> <li>توفير بيئة افتراضية آمنة وموثوقة.</li> <li>تطوير واجهة مستخدم متطورة وسهلة الاستخدام.</li> <li>توفير ميزات إحصائية وتحليلية قوية.</li> <li>مرونة وتكيف مع البيئات التعليمية المختلفة.</li> <li>دعم التقييم الشامل والتنوع.</li> <li>التوسع العالمي والتعاون.</li> <li>الابتكار المستدام والتحسين المستمر.</li> </ol> </div> -->
        <h3 style="color: #3366cc;">أهدافنا:</h3>
        <ol style="color: #666666;">
          <li>توفير بيئة افتراضية آمنة وموثوقة.</li>
          <li>تطوير واجهة مستخدم متطورة وسهلة الاستخدام.</li>
          <li>مرونة وتكيف مع البيئات التعليمية المختلفة.</li>
          <li>دعم التقييم الإلكتروني.</li>
          <li>الابتكار المستدام والتحسين المستمر.</li>
        </ol>
        <br>
        <h3 style="color: #3366cc;">للتواصل:</h3>
        <br>
        <div class="d-flex">
          <v-icon class="me-2 ml-2" size="small">
            mdi-facebook
          </v-icon>
          <div>
            https://www.facebook.com/ExamPlatform
          </div>
        </div>
        <div class="d-flex">
          <v-icon class="me-2 ml-2" size="small">
            mdi-phone
          </v-icon>
          <div>
            218-91-4212678
          </div>
        </div>
      </div>
    </div>
  </v-locale-provider>
</template>

<style scoped>
.bisque-background {
  background-color: #f2f2f2;
  padding: 20px;
  border-radius: 10px;
}
</style>