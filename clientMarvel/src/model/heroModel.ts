import { IBrand } from "./brandModel"
import { IHeroInfo } from "./heroInfoModel"
import { IImage } from "./imageModel"
import { IPower } from "./powerModel"

export interface IHeroes {
  heroes: IHero[]
  total: number
  maxPrice: number
}

export interface IHero {
  id: number
  nickname: string
  real_name: string
  origin_description: string
  catch_phrase: string
  title_img: string
  price: number
  brand: IBrand
  images: IImage[]
  powers: IPower[]
  heroInfo?: IHeroInfo[]
}

export interface ICreateHero {
  nickname: string
  real_name: string
  origin_description: string
  catch_phrase: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  title_img?: File | any
  price: string
  brandName: string
}

export interface IUpdataHero extends ICreateHero {}
