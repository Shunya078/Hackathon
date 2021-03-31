module ApplicationHelper
  def youbi_tag(date)
    date.strftime(%(%m-%d(#{%w(日 月 火 水 木 金 土)[date.wday]})))
  end
end
