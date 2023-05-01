import { Layout } from 'antd';
import { Footer } from '../../commonComponents/footer';
import { Header } from '../../commonComponents/header';
import chef from '../../assets/about-chef.jpeg';
import style from './style.module.css';

const { Content } = Layout;

export function AboutPage() {
  return (
    <Layout className={style.layout}>
      <Header />
      <Content className={style.content}>
        <div style={{ textAlign: 'center' }}>
          <p className={style.paragraph}>
            {`In today's fast-paced world, people are always on the lookout for
            easy and convenient ways to make their lives better. With the
            increasing popularity of cooking at home, there is a growing need
            for apps that offer delicious and easy-to-follow recipes.`}
          </p>
          <img className={style.chefImage} src={chef} alt="chef" />
          <p className={style.paragraph}>
            {`I'm a passionate foodie with a love for creating new recipes. Over 
            the years, I've honed my skills and developed a unique cooking style
            that combines the traditional with the modern. Recently, I came up
            with an idea for an app that would revolutionize the cooking 
            experience - the StoneSoup app.`}
          </p>
          <p className={style.paragraph}>
            {`Inspired by the popular folktale about making soup out of stones,
            the StoneSoup app would offer a wide variety of recipes that can be
            made with simple, everyday ingredients. The app would have a
            user-friendly interface with clear instructions, step-by-step
            photos, and nutritional information to help anyone become a
            confident and creative home cook.`}
          </p>
          <p className={style.paragraph}>
            {`I'm excited about the potential for the StoneSoup app to change the
            way people cook and eat. With its vast selection of delicious and
            easy-to-follow recipes, the app has the potential to become a staple
            in every home cook's kitchen. Join me in creating a better cooking
            experience for everyone!`}
          </p>
        </div>
      </Content>
      <Footer />
    </Layout>
  );
}
