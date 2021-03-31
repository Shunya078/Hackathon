Rails.application.routes.draw do
  get 'work_shift_table/home'

  resources :user_shift_forms
  get 'work_shift_table/members'

  devise_scope :user do
    get '/' => 'comments#index'
    get '/users/sign_out' => 'devise/sessions#destroy'
  end

  resources :comments
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'comments#index'

  resources :users, except: [:destroy] do
    member do
      get :mypage
    end
  end

  namespace :api, { format: 'json' } do
      resources :events
  end
end
