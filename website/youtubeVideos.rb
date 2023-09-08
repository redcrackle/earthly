require 'json'
require 'net/http'
require 'uri'

puts "Fetching youtube videos"

begin
  uri = URI('https://youtue.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=UUlROK3yIuIyJWmt-gnkAjlQ&key=AIzaSyCKS2_U1c9NGRlcobOjN9MEpV1WGGWVHSA')
  res = Net::HTTP.get_response(uri)

  videos = []
  JSON.parse(res.body)['items'].each do |video|
    videos << { title: video['snippet']['title'], videoId: video['snippet']['resourceId']['videoId'], type: 'Video' }
  end

  File.write("_data/webinar-videos.json", videos.to_json)
  puts "Updated videos data"
rescue Timeout::Error, Errno::EINVAL, Errno::ECONNRESET, EOFError,
  Net::HTTPBadResponse, Net::HTTPHeaderSyntaxError, Net::ProtocolError => e
end