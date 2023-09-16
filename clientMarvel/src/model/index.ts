export interface IHeroes {
  heroes: IHero[]
  total: number
}

export interface IHero {
  id: number
  nickname: string
  real_name: string
  origin_description: string
  catch_phrase: string
  title_img: string
  images: IImage[]
  powers: IPower[]
}

export interface IImage {
  id: number
  imageHero: string
}

export interface IPower {
  id: number
  power: string
}

export interface ICreateHero {
  nickname: string
  real_name: string
  origin_description: string
  catch_phrase: string
  title_img?: File
  powers?: IPower[]
}
