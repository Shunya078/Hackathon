require 'dotenv'

Dotenv.load '.env'
USERNAME = ENV['USERNAME']
EMAIL = ENV['EMAIL']

class GitSimplify
  def initialize(
    command:,
    path: nil,
    file_name: nil,
    diff: nil,
    commit_message: nil,
    branch_name: nil
  )
    @command = command
    @path = path
    @file_name = file_name
    @diff = diff
    @commit_message = commit_message
    @branch_name = branch_name
  end

  def execute
    case @command
    when '-h' || '--help'
      show_help
    when '-i' || '--init'
      create_file
    when '-p' || '--push'
      push_git
    end
  end

  private

  def create_file
    system("cd #{@path}")
    system("mkdir #{@file_name}")
    init_git
  rescue StandardError
    raise "Error: You didn't create file."
  end

  def init_git
    system('git init')
    system("git config --global user.email '#{EMAIL}'")
    system("git config --global user.name '#{USERNAME}'")
    puts <<~'EOS'
      Succesfully created '#{
        @file_name
      }'! You type % git remote add origin [git-SSHKEY]
    EOS
  end

  def push_git
    system("cd #{@path}")
    system("git add '#{@diff}'")
    system("git commit -m '#{@commit_message}'")
    system("git push origin '#{@branch_name}'")
    p "Succesfully pushing to Github ['#{@commit_message}']"
  rescue StandardError
    raise "Error: You didn't push to github."
  end

  def show_help
    puts <<~'EOS'
      Create tool for new github file!
      Usage: %ruby git_file_maker.rb [-options]
      -h --help     , show help / %ruby git_file_maker.rb -h
      -p --push     , push to github / %ruby git_file_maker.rb -p path diff commit_message branch_name
      -i --init     , set to create filename / %ruby git_file_maker.rb -i path file_name
    EOS
  end
end

if __FILE__ == $0
  git_simplify =
    case ARGV[0]
    when '-h' || '--help'
      GitSimplify.new(command: ARGV[0])
    when '-p' || '--push'
      GitSimplify.new(
        command: ARGV[0],
        path: ARGV[1],
        diff: ARGV[2],
        commit_message: ARGV[3],
        branch_name: ARGV[4]
      )
    when '-i' || '--init'
      GitSimplify.new(command: ARGV[0], path: ARGV[1], file_name: ARGV[2])
    end
  git_simplify.execute
end
