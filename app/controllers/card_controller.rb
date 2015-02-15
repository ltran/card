class CardController < ApplicationController
  def show
    cards = [
      {
        first_name: 'Taylor',
        last_name: "Swift",
        location: 'San Francisco, CA',
        profile_picture: '//www.billboard.com/files/styles/promo_650/public/media/do-no-reuse-taylor-swift-the-beat-bb36-sarah-barlow-billboard-650.jpg'
      },
      {
        first_name: 'マリオ',
        last_name: "",
        location: 'Mushroom Kingdom',
        profile_picture: '//fc03.deviantart.net/fs70/i/2012/255/0/7/super_mario_galaxy_by_ratchetmario-d5efp8h.jpg'
      }
    ]

    respond_to do |format|
      format.json { render json: cards[params[:id].to_i].as_json }
    end
  end
end
